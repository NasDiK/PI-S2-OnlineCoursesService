/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import {DirectoryField} from '../../../../../../shared';
import {fieldType} from '@local/enums/shared';
import s from './Creators.module.scss';
import {magic} from '../../../../../../../mobxUtils';

const SingleAnswerCreator = ({setTargetComponent, targetComponent}) => {
  const setTaskProp = (key, val) => {
    setTargetComponent({
      ...targetComponent,
      additionals: {
        ...targetComponent.additionals,
        [key]: val
      }
    });
  };

  return (
    <div className={s.singleAnswer}>
      <DirectoryField
        type={fieldType.TEXT}
        placeholder={'Заголовок задачи'}
        onChange={(_title) => setTaskProp('title', _title)}
        value={targetComponent.additionals?.title}
      />
      <DirectoryField
        type={fieldType.TEXT_AREA}
        placeholder={'Описание задачи'}
        textAreaVariant={'simple'}
        onChange={(_desc) => setTaskProp('description', _desc)}
        value={targetComponent.additionals?.description}
      />
      <DirectoryField
        type={fieldType.TEXT}
        placeholder={'Ответ'}
        onChange={(_answer) => setTaskProp('answer', _answer)}
        value={targetComponent.additionals?.answer}
      />
    </div>
  );
};

const mapStore = ({CreateCourseStore}) => {
  return {
    setTargetComponent: CreateCourseStore.setTargetComponent,
    targetComponent: CreateCourseStore.targetComponent
  };
};

export default magic(SingleAnswerCreator, {store: mapStore});