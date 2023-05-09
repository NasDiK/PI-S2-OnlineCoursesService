/* eslint-disable no-console */
import React, {useEffect, useState} from 'react';
import {useMatches} from 'react-router';
import {useSelector, useDispatch} from 'react-redux';
import {searchTaskWithId, checkTaskAnswer} from './Methods/TaskMethods';
import s from './Task.module.scss';
import cn from 'classnames';
import {Typography, DirectoryField, Button, Alert} from '../../../shared';
import {fieldType as taskType, action as taskActionEnum} from '@local/enums/tasks';
import {fieldType as directoryFieldEnum, status} from '@local/enums/shared';
import {iState as iTaskStoreState} from '../../../../stores/components/Task/TaskReducer';
import TaskModel from '../../../../stores/shared/models/TaskModel';
import {getReviewsLogs} from '../../../../api/reviews';
import {dateFormat as dateFormatList} from '@local/enums/tools';
import {dateConverter} from '../../../../utils';
import {magic} from '../../../../mobxUtils';
import PropTypes from 'prop-types';

interface iStore {
  taskStore: iTaskStoreState
}

const isTeacher = false; //Вынести в стору

const renderTasks = (
  task: TaskModel | undefined,
  setVal: (_val) => void | undefined,
  answer
) => {
  let _values;

  switch (task?.type) {
    case taskType.SINGLE_ANSWER:
      return (
        <DirectoryField
          type={directoryFieldEnum.TEXT}
          onChange={setVal}
          fullWidth={true}
          value={answer}
          isDone={!task.isPermittedSend}
        />
      );
    case taskType.RADIO:
      _values = task?.taskValue && JSON.parse(`${task?.taskValue?.toString()}`) || null;

      if (_values) {
        return (
          <DirectoryField
            type={directoryFieldEnum.RADIO_GROUP}
            options={_values}
            onChange={setVal}
            isDone={!task.isPermittedSend}
            value={answer}
          />
        );
      }

      return null;
    case taskType.MULTI_ANSWER:
      _values = task?.taskValue && JSON.parse(`${task?.taskValue?.toString()}`) || null;

      if (_values) {
        return (
          <DirectoryField
            type={directoryFieldEnum.CHECKBOX_GROUP}
            options={_values}
            onChange={setVal}
            isDone={!task.isPermittedSend}
            value={answer}
          />
        );
      }

      return null;
    case taskType.TEXT_AREA:
      _values = task?.taskValue || '';
      // eslint-disable-next-line no-case-declarations
      const _isDone = !task.isPermittedSend;

      return (
        <DirectoryField
          type={directoryFieldEnum.TEXT_AREA}
          value={_isDone && task.lastLogValue || _values}
          isDone={_isDone}
          onChange={setVal}
        />
      );
  }

  return null;
};

const renderSubmitButton = (taskId, answer, permissions, additionals) => (
  <React.Fragment>
    {/* {permissions.canCheckAnswers && <Button>{'Список решений студентов'}</Button>} */}
    {
      permissions.canSend && (
        <Button onClick={
          () => {
            checkTaskAnswer(taskId, answer);
            console.log(additionals);
            additionals.loadTaskFunc();
          }
        }
        >
          {'Отправить'}
        </Button>
      ) || (
        <Button
          disabled={true}
          backgroundColor={'whitegreen'}
        >
          {
            `Отправлено ${
              dateConverter.dateConverter(additionals.doneAt, dateFormatList.FULL_WITH_TIME)
            }`
          }
        </Button>
      )
    }
  </React.Fragment>
);

const renderReviewState = (action: number) => {
  switch (action) {
    case taskActionEnum.REVIEW_APPROVE:
      return (
        <div className={s.reviewResult}>
          <Typography className={s.green}>{'Код одобрен преподавателем'}</Typography>
        </div>
      );
    case taskActionEnum.REVIEW_FAIL:
      return (
        <div className={s.reviewResult}>
          <Typography className={s.red}>{'Код отклонён преподавателем'}</Typography>
        </div>
      );
    case taskActionEnum.SEND_TO_REVIEW:
      return (
        <div className={s.reviewResult}>
          <Typography>{'Код отправлен на проверку'}</Typography>
        </div>
      );
  }
};

const renderTaskResult = (taskStatus) => {
  switch (taskStatus) {
    case status.SUCCESS:
      return (
        <Alert
          variant={'success'}
          width={'fit-content'}
          margin={'8px 0 0 0'}
        >
          {'Правильный ответ'}
        </Alert>
      );
    case status.INCORRECT:
      return (
        <Alert
          variant={'error'}
          width={'fit-content'}
          margin={'8px 0 0 0'}
        >
          {'Неверный ответ'}
        </Alert>
      );
    default:
      return null;
  }
};

const TaskView = ({curUserId, _loadTask}) => {
  const [match] = useMatches();
  const task = useSelector((stores: iStore) => stores.taskStore.task);
  const taskLogs = useSelector((stores: iStore) => stores.taskStore.taskLogs);
  const dispatch = useDispatch();
  let _taskModel = new TaskModel(task, taskLogs);

  const setTaskDispatch = (payload) => dispatch({type: 'SET_TASK', payload});
  const [answer, setAnswer] = useState(_taskModel.lastLogValue);

  const loadTaskInfo = async() => {
    const taskId = Number(match.params.id);

    await searchTaskWithId(setTaskDispatch, taskId);
    const _logsList = await getReviewsLogs([
      'tasks_logger.id as log_id',
      'tasks_logger.status as log_status',
      'action as log_action',
      'tasks_logger.user_id as user_id',
      'tasks.title as task_title',
      'tasks.description as task_description',
      'task_id as task_id',
      'createdAt as log_date',
      'tasks_logger.value as log_value',
      'groups.title as group_title',
      'groups.id as group_id',
      'users.fullname as user_fullname',
      'tasks.max_note as task_maxNote'
    ], ['tasks', 'users'], {
      tasksIds: [taskId],
      userIds: [curUserId]
    }, [
      ['user_id', 'asc'],
      ['task_id', 'asc'],
      ['tasks_logger.id', 'desc']
    ]);

    const _logAnswer = _logsList?.slice(-1)?.[0]?.log_value;

    setAnswer(_logAnswer);
    dispatch({type: 'SET_TASK_LOGS', payload: _logsList});
  };

  useEffect(() => {
    loadTaskInfo();
    _loadTask(); //mobx to work)
  }, [match.pathname]);

  useEffect(() => {
    _taskModel = new TaskModel(task, taskLogs);
  }, [task, taskLogs]);

  return (
    <div className={s.taskWrapper}>
      <div className={s.title}>
        <Typography weight={'bold'} variant={'body24'}>{task?.title}</Typography>
      </div>
      <div className={cn(s.task, s.island)}>
        {
          _taskModel.maxNote && (
            <div className={s.maxNote}>
              <Typography variant={'body14'} weight={'bold'}>
                {`Максимум ${_taskModel.maxNote} баллов`}
              </Typography>
            </div>
          )
        }
        <div className={s.description}>{task?.description}</div>
        {_taskModel.lastlog && renderReviewState(_taskModel.lastlog.log_action)}
        {
          task?.type && (
            <React.Fragment>
              <div className={s.inputFields}>{
                renderTasks(
                  _taskModel, (_val) => {
                    setAnswer(_val);
                  }, answer
                )
              }
              {renderTaskResult(_taskModel.lastLogStatus)}
              </div>
              <div className={s.confirmButtons}>{
                renderSubmitButton(_taskModel.id, answer, {
                  canCheckAnswers: _taskModel.isPermittedWatchLogs,
                  canSend: _taskModel.isPermittedSend
                }, {
                  doneAt: _taskModel?.lastlog?.log_date,
                  loadTaskFunc: loadTaskInfo
                })
              }
              </div>
            </React.Fragment>
          )
        }
      </div>
      {isTeacher ? <div className={cn(s.studentsContainer, s.island)}>{'test'}</div> : null}
    </div>
  );
};

const mapStore = ({UserStore, CourseStore}) => {
  return {
    curUserId: UserStore.userId,
    setTargetTaskId: CourseStore.setTargetTaskId,
    _loadTask: CourseStore._loadTask
  };
};

TaskView.propTypes = {
  curUserId: PropTypes.number,
  setTargetTaskId: PropTypes.func,
  _loadTask: PropTypes.func //ну недолжно быть атк..
};

export default magic(TaskView, {store: mapStore});