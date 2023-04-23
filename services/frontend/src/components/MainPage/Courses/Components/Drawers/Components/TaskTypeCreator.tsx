import React from 'react';
import s from '../Drawers.module.scss';
import {Button, DirectoryField, Typography} from '../../../../../shared';
import {useDispatch, useSelector} from 'react-redux';
import {targetFields, fieldType} from '@local/enums/shared';
import {fieldType as taskTypeEnums} from '@local/enums/tasks';
import {creationTaskTypes} from '../../consts';
import MultiAnswerCreator from './TaskCreators/MultiAnswerCreator';
import RadioCreator from './TaskCreators/RadioCreator';
import SingleAnswerCreator from './TaskCreators/SingleAnswerCreator';
import TextAreaCreator from './TaskCreators/TextAreaCreator';

const renderTaskCreator = (taskType) => {
  switch (taskType) {
    case taskTypeEnums.TEXT_AREA:
      return <TextAreaCreator />;
    case taskTypeEnums.MULTI_ANSWER:
      return <MultiAnswerCreator />;
    case taskTypeEnums.RADIO:
      return <RadioCreator />;
    case taskTypeEnums.SINGLE_ANSWER:
    default:
      return <SingleAnswerCreator />;
  }
};

const TaskTypeCreator = () => {
  const dispatch = useDispatch();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const targetComponent = useSelector((stores: any) => stores.createDrawerStore.targetComponent);

  const setComponentTaskId = (taskType) =>
    dispatch({type: 'SET_TARGET_TASK_TYPE', payload: {taskType}});

  const synchTargetAndSelector = () =>
    dispatch({type: 'SYNCH_TARGET_WITH_SELECTOR', payload: {targetComponent}});

  // eslint-disable-next-line no-console
  console.log(targetComponent);

  if (!targetComponent) {
    return <Typography>{'Выберите или создайте задачу'}</Typography>;
  }

  return (
    <div className={s.taskTypeCreator}>
      <div className={s.type}>
        <Typography weight={'bold'}>{'Тип задачи'}</Typography>
        <DirectoryField
          type={fieldType.SELECT}
          options={
            [
              creationTaskTypes.SINGLE_ANSWER,
              creationTaskTypes.MULTI_ANSWER,
              creationTaskTypes.TEXT_AREA,
              creationTaskTypes.RADIO
            ]
          }
          value={targetComponent?.additionals?.taskType || -1}
          onChange={(typeId) => setComponentTaskId(typeId)}
        />
      </div>
      {
        targetComponent?.additionals?.taskType &&
          renderTaskCreator(targetComponent.additionals.taskType)
      }
      <hr />
      <div className={s.buttons}>
        {
          targetComponent?.additionals?.taskType && (
            <Button
              backgroundColor={'#7FFF00'}
              onClick={synchTargetAndSelector}
            >
              {'Сохранить текущие параметры'}
            </Button>
          )
        }
        <Button
          onClick={
            () => dispatch({type: 'ADD_TASK_FOR_SELECTOR',
              payload: {
                id: parseInt((Math.random() * 99999).toString()),
                type: targetFields.ELEMENT,
                name: 'TTT',
                additionals: {}
              }})
          }
          backgroundColor={'#00FFFF'}
        >{'Добавить новый таск'}
        </Button>
      </div>
    </div>
  );
};

export default TaskTypeCreator;