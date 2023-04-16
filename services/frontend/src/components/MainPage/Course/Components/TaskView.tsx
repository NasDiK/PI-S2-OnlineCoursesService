import React, {useEffect, useState} from 'react';
import {useMatches} from 'react-router';
import {useSelector, useDispatch} from 'react-redux';
import {searchTaskWithId, checkTaskAnswer} from './Methods/TaskMethods';
import s from './Task.module.scss';
import cn from 'classnames';
import {Typography, DirectoryField, Button} from '../../../shared';
import {fieldType as taskType, action as taskActionEnum} from '@local/enums/tasks';
import {fieldType as directoryFieldEnum} from '@local/enums/shared';
import {iState as iTaskStoreState} from '../../../../stores/components/Task/TaskReducer';
import TaskModel from '../../../../stores/shared/models/TaskModel';
import {getReviewsLogs} from '../../../../api/reviews';
interface iStore {
  taskStore: iTaskStoreState
}

const isTeacher = false; //Вынести в стору

const renderTasks = (
  task: TaskModel | undefined,
  setVal: (_val) => void | undefined
) => {
  let _values;

  switch (task?.type) {
    case taskType.SINGLE_ANSWER:
      return (
        <DirectoryField
          type={directoryFieldEnum.TEXT}
          onChange={(_val) => setVal(_val)}
          fullWidth={true}
        />
      );
    case taskType.RADIO:
      _values = task?.taskValue && JSON.parse(`${task?.taskValue?.toString()}`) || null;

      if (_values) {
        return (
          <DirectoryField
            type={directoryFieldEnum.RADIO_GROUP}
            options={_values}
            onChange={(_val) => setVal(_val)}
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
            onChange={(_val) => setVal(_val)}
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
          onChange={(_val) => setVal(_val)}
        />
      );
  }

  return null;
};

const renderSubmitButton = (taskId, answer, permissions) => (
  <React.Fragment>
    {permissions.canCheckAnswers && <Button>{'Список решений студентов'}</Button>}
    {
      permissions.canSend && (
        <Button onClick={() => checkTaskAnswer(taskId, answer)}>
          {'Отправить'}
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

const TaskView = () => {
  const [match] = useMatches();
  const task = useSelector((stores: iStore) => stores.taskStore.task);
  const taskLogs = useSelector((stores: iStore) => stores.taskStore.taskLogs);
  const dispatch = useDispatch();
  let _taskModel = new TaskModel(task, taskLogs);

  const setTaskDispatch = (payload) => dispatch({type: 'SET_TASK', payload});
  const [answer, setAnswer] = useState();

  useEffect(() => {
    const taskId = Number(match.params.id);

    searchTaskWithId(setTaskDispatch, taskId).then(() => setAnswer(undefined));
    getReviewsLogs([
      'tasks_logger.id as log_id',
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
      tasksIds: [taskId]
    }, [
      ['user_id', 'asc'],
      ['task_id', 'asc'],
      ['createdAt', 'asc']
    ]).then((result) => dispatch({type: 'SET_TASK_LOGS', payload: result}));

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
                  }
                )
              }
              </div>
              <div className={s.confirmButtons}>{
                renderSubmitButton(_taskModel.id, answer, {
                  canCheckAnswers: _taskModel.isPermittedWatchLogs,
                  canSend: _taskModel.isPermittedSend
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

export default TaskView;