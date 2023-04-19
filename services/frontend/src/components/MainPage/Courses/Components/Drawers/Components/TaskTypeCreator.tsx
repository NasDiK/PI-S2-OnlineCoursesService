import React from 'react';
import s from '../Drawers.module.scss';
import {Button} from '../../../../../shared';
import {useDispatch} from 'react-redux';
import {targetFields} from '@local/enums/shared';

const TaskTypeCreator = () => {
  const dispatch = useDispatch();

  return (
    <div className={s.taskTypeCreator}>
      <Button onClick={
        () => dispatch({type: 'ADD_TASK_FOR_SELECTOR',
          payload: {
            id: -1,
            type: targetFields.ELEMENT,
            name: 'TTT'
          }})
      }
      >{'Добавить таск'}
      </Button>
    </div>
  );
};

export default TaskTypeCreator;