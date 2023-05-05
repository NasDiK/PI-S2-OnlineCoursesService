/* eslint-disable react/prop-types */
/* eslint-disable no-console */
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
import {magic} from '../../../../../../mobxUtils';

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

const TaskTypeCreator = ({
  targetComponent, setTargetComponent, synchTargetAndSelector, deleteTaskById, renameTaskById
}) => {
  const renameTargetComponent = () => {
    const _newName = prompt();

    _newName && renameTaskById(targetComponent.id, _newName);
  };

  const dropTaskFromSelector = () => {
    if (confirm(`Подтвердите удаление задачи: ${targetComponent.name}`)) {
      deleteTaskById(targetComponent.id);
    }
  };

  const setTargetTaskId = (taskType) => {
    setTargetComponent({
      ...targetComponent,
      additionals: {
        taskType
      }
    });
  };

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
          onChange={setTargetTaskId}
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
        {/* <Button
          onClick={renameTargetComponent}
          backgroundColor={'yellow'}
        >{'Переименовать текущий таск'}
        </Button> */}
        <Button
          onClick={dropTaskFromSelector}
          backgroundColor={'red'}
        >{'Удалить таск'}
        </Button>
      </div>
    </div>
  );
};

const mapStore = ({CreateCourseStore}) => {
  return {
    targetComponent: CreateCourseStore.targetComponent,
    setTargetComponent: CreateCourseStore.setTargetComponent,
    synchTargetAndSelector: CreateCourseStore.synchTargetAndSelector,
    deleteTaskById: CreateCourseStore.deleteTaskById,
    renameTaskById: CreateCourseStore.renameTaskById
  };
};

export default magic(TaskTypeCreator, {store: mapStore});