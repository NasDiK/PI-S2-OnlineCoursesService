import React, {useEffect, useState} from 'react';
import {useMatches} from 'react-router';
import {iTask, iValueField} from './Task';
import {useSelector, useDispatch, useStore} from 'react-redux';
import s from './Task.module.scss';
import cn from 'classnames';
import {Typography, DirectoryField, Button} from '../../../shared';
import {fieldType as taskType} from '@local/enums/tasks';
import {fieldType as directoryFieldEnum} from '@local/enums/shared';

const isTeacher = true; //Вынести в стору
const mockTask: iTask = {
  id: 1,
  title: 'Веселюся',
  description: 'Мы писали, мы писали, наши пальчики устали',
  'value': undefined,
  type: taskType.SINGLE_ANSWER,
  'max_note': 8
};

const renderTasks = (
  type: number | undefined,
  val: Array<iValueField> | undefined,
  setVal: (_val: string) => void | undefined
) => {
  switch (type) {
    case taskType.SINGLE_ANSWER:
      return (
        <DirectoryField
          type={directoryFieldEnum.TEXT}
          onChange={(_val) => setVal(_val)}
          fullWidth={true}
        />
      );
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
                  task?.type, task?.value, (_t) => {
                    const t = 1;
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