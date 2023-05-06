/* eslint-disable react/prop-types */
import {DirectoryField} from '../../../../../../shared';
import React from 'react';
import s from './Creators.module.scss';
import {fieldType} from '@local/enums/shared';
import {magic} from '../../../../../../../mobxUtils';

const TextAreaCreator = ({targetComponent, setTargetComponent}) => {
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
    <div className={s.textAreaAnswer}>
      <DirectoryField
        type={fieldType.TEXT}
        placeholder={'Название задачи'}
        value={targetComponent.additionals?.title}
        onChange={(_title) => setTaskProp('title', _title)}
      />
      <DirectoryField
        type={fieldType.TEXT_AREA}
        placeholder={'Описание задачи'}
        textAreaVariant={'simple'}
        value={targetComponent.additionals?.description}
        onChange={(_desc) => setTaskProp('description', _desc)}
      />
      <DirectoryField
        type={fieldType.TEXT_AREA}
        placeholder={'Заготовленный ответ'}
        textAreaVariant={'simple'}
        value={targetComponent.additionals?.template}
        onChange={(_template) => setTaskProp('template', _template)}
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

export default magic(TextAreaCreator, {store: mapStore});