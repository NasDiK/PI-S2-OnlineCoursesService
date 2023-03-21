/* eslint-disable no-case-declarations */
import React, {useEffect, useState} from 'react';
import {useMatches} from 'react-router';
import {iTask, iValueField} from './Task';
import {useSelector, useDispatch, useStore} from 'react-redux';
import {searchTaskWithId} from './Methods/TaskMethods';
import s from './Task.module.scss';
import cn from 'classnames';
import {Typography, DirectoryField, Button} from '../../../shared';
import {fieldType as taskType} from '@local/enums/tasks';
import {fieldType as directoryFieldEnum} from '@local/enums/shared';
import {iState as iTaskStoreState} from '../../../../stores/components/Task/TaskReducer';

interface iStore {
  taskStore: iTaskStoreState
}

const isTeacher = true; //Вынести в стору

const renderTasks = (
  task: iTask | undefined,
  setVal: (_val: string) => void | undefined
) => {
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
      const values = task?.value && JSON.parse(`${task?.value?.toString()}`) || null;

      if (values) {
        return (
          <DirectoryField
            type={directoryFieldEnum.RADIO_GROUP}
            options={values}
            onChange={(_val) => setVal(_val)}
          />
        );
      }

      return null;
    case taskType.MULTI_ANSWER:
      const _values = task?.value && JSON.parse(`${task?.value?.toString()}`) || null;

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
  }

  return null;
};

const renderSubmitButton = () => (
  <React.Fragment>
    {true && <Button>{'Список решений студентов'}</Button>}
    {true && <Button>{'Отправить'}</Button>} {/* Положить условие в кнопки */}
  </React.Fragment>
);

const TaskView = () => {
  const [match] = useMatches();
  const task = useSelector((stores: iStore) => stores.taskStore.task);
  const dispatch = useDispatch();
  const setTaskDispatch = (payload) => dispatch({type: 'SET_TASK', payload});

  useEffect(() => {
    const taskId = Number(match.params.taskId);

    searchTaskWithId(setTaskDispatch, taskId);
  }, [match.pathname]);

  // useEffect(() => {
  //   dispatch({type: 'GET_TASK'});
  // }, []);

  return (
    <div className={s.taskWrapper}>
      <div className={s.title}>
        <Typography weight={'bold'} variant={'body24'}>{task?.title}</Typography>
      </div>
      <div className={cn(s.task, s.island)}>
        {
          task?.max_note && (
            <div className={s.maxNote}>
              <Typography variant={'body14'} weight={'bold'}>
                {`Максимум ${task.max_note} баллов`}
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
                  task, (_t) => {
                    // eslint-disable-next-line no-console
                    console.log(_t);
                  }
                )
              }
              </div>
              <div className={s.confirmButtons}>{renderSubmitButton()}</div>
            </React.Fragment>
          )
        }
      </div>
      {isTeacher ? <div className={cn(s.studentsContainer, s.island)}>{'test'}</div> : null}
    </div>
  );
};

export default TaskView;