import React, {useEffect, useState} from 'react';
import {useMatches} from 'react-router';
import {iTask, iValueField} from './Task';
import {useSelector, useDispatch, useStore} from 'react-redux';
import s from './Task.module.scss';
import cn from 'classnames';
import {Typography} from '../../../shared';
import {fieldType} from '@local/enums/tasks';

const isTeacher = false; //Вынести в стору
const mockTask: iTask = {
  id: 1,
  title: 'Веселюся',
  description: 'Мы писали, мы писали, наши пальчики устали',
  'value': [
    {
      type: 2 //SINGLE_ANSWER
    }
  ],
  'max_note': 8
};

const renderTasks = (val: Array<iValueField>) => val.map((option: iValueField, index) => {
  const t = 1;

  switch (option.type) {
    case fieldType.SINGLE_ANSWER:
      return <input type={'text'} />;
  }

  return <div key={index}>{'test'}</div>;
});

const renderSubmitButton = () => <button>{'test'}</button>;

const TaskView = () => {
  const [task, setTask] = useState<iTask>();
  const [match] = useMatches();
  const store = useStore();
  const dispatch = useDispatch();
  // eslint-disable-next-line padding-line-between-statements, no-console

  useEffect(() => {
    const taskId = Number(match.params.taskId);

    // setTask({id: taskId});
    setTask(mockTask);
  }, [match.pathname]);

  useEffect(() => {
    dispatch({type: 'GET_TASK'});
  }, []);

  return (
    <div className={s.taskWrapper}>
      <div className={s.title}>
        {task?.title}
      </div>
      <div className={s.task}>
        {
          task?.max_note && (
            <div className={s.maxNote}>
              <Typography variant={'body14'}>{`Максимум ${task.max_note} баллов`}</Typography>
            </div>
          )
        }
        <div className={s.description}>{task?.description}</div>
        {task?.value && [renderTasks(task.value), renderSubmitButton()]}
      </div>
      {isTeacher ? <div className={s.studentsContainer}>{'test'}</div> : null}
    </div>
  );
};

export default TaskView;