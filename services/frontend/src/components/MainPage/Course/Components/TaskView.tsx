import React, {useEffect, useState} from 'react';
import {useMatches} from 'react-router';
import {useSelector, useDispatch} from 'react-redux';
import {searchTaskWithId, checkTaskAnswer} from './Methods/TaskMethods';
import s from './Task.module.scss';
import cn from 'classnames';
import {Typography, DirectoryField, Button} from '../../../shared';
import {fieldType as taskType} from '@local/enums/tasks';
import {fieldType as directoryFieldEnum} from '@local/enums/shared';
import {iState as iTaskStoreState} from '../../../../stores/components/Task/TaskReducer';
import TaskModel from '../../../../stores/shared/models/TaskModel';
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
      _values = task?.taskValue;

      return (
        <DirectoryField
          type={directoryFieldEnum.TEXT_AREA}
          value={_values}
          // isDone={true}
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

const TaskView = () => {
  const [match] = useMatches();
  const task = useSelector((stores: iStore) => stores.taskStore.task);
  const dispatch = useDispatch();
  let _taskModel = new TaskModel(task);

  const setTaskDispatch = (payload) => dispatch({type: 'SET_TASK', payload});
  const [answer, setAnswer] = useState();

  useEffect(() => {
    const taskId = Number(match.params.taskId);

    searchTaskWithId(setTaskDispatch, taskId).then(() => setAnswer(undefined));
  }, [match.pathname]);

  useEffect(() => {
    _taskModel = new TaskModel(task);
  }, [task]);

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