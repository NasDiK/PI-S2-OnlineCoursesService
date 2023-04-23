import {Typography, Button, DirectoryField} from '../../../../../../shared';
import React from 'react';
import s from './Creators.module.scss';
import {fieldType} from '@local/enums/shared';
import {useDispatch, useSelector} from 'react-redux';

const TextAreaCreator = () => {
  const dispatch = useDispatch();

  const targetComponent = useSelector((stores: any) => stores.createDrawerStore.targetComponent);
  const setTaskProp = (key, val) => {
    dispatch({type: 'SET_TARGET_ADDITIONAL_PROP', payload: {key, 'value': val}});
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

export default TextAreaCreator;