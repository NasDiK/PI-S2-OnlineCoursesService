/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import {DirectoryField, Typography} from '../../../../../../shared';
import {fieldType} from '@local/enums/shared';
import s from './Creators.module.scss';
import {useDispatch, useSelector} from 'react-redux';

const SingleAnswerCreator = () => {
  const dispatch = useDispatch();

  const targetComponent = useSelector((stores: any) => stores.createDrawerStore.targetComponent);
  const setTaskProp = (key, val) => {
    dispatch({type: 'SET_TARGET_ADDITIONAL_PROP', payload: {key, 'value': val}});
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

export default SingleAnswerCreator;