/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import s from './Creators.module.scss';
import {Typography, Button, DirectoryField} from '../../../../../../shared';
import {fieldType} from '@local/enums/shared';
import AddIcon from '@mui/icons-material/Add';
import {magic} from '../../../../../../../mobxUtils';

const RadioCreator = ({targetComponent, setTargetComponent}) => {
  const setTaskProp = (key, val) => {
    setTargetComponent({
      ...targetComponent,
      additionals: {
        ...targetComponent.additionals,
        [key]: val
      }
    });
  };

  const addNewOption = () => {
    const _curOptions = [...targetComponent.additionals?.options || []];

    _curOptions.push({
      'value': parseInt((Math.random() * 9999).toString()),
      'label': 'Новая опция'
    });

    setTaskProp('options', _curOptions);
  };

  const deleteOptionWithValue = (val) => {
    const _curOptions = [...targetComponent.additionals?.options || []];
    const _findedIdx = _curOptions.findIndex(({value: optVal}) => optVal === val);

    if (_findedIdx === -1) {
      return;
    }

    const _fp = _curOptions.slice(0, _findedIdx);
    const _lp = _curOptions.slice(_findedIdx + 1, _curOptions.length);

    setTaskProp('options', [..._fp, ..._lp]);
  };

  const changeOptionName = ({val, after}) => {
    const _curOptions = [...targetComponent.additionals?.options || []];
    const _findOptionIdx = _curOptions.findIndex(({value: optVal}) => optVal === val);
    const _opt = _curOptions[_findOptionIdx];

    const _fp = _curOptions.slice(0, _findOptionIdx);
    const _lp = _curOptions.slice(_findOptionIdx + 1, _curOptions.length);

    setTaskProp('options', [..._fp, {..._opt, label: after}, ..._lp]);
  };

  return (
    <div className={s.radioAnswer}>
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
      {
        targetComponent.additionals?.options?.length && (
          <DirectoryField
            type={fieldType.RADIO_GROUP}
            value={targetComponent.additionals?.rightAnswer}
            options={targetComponent.additionals.options}
            onChange={(_ra) => setTaskProp('rightAnswer', _ra)}
            isEditable={true}
            editCallback={changeOptionName}
            isDeletable={true}
            deleteCallback={deleteOptionWithValue}
          />
        ) || null
      }
      <div className={s.addOption}>
        <Button variant={'thin'} onClick={addNewOption}>
          <AddIcon />
          <Typography>{'Добавить опцию'}</Typography>
        </Button>
      </div>
    </div>
  );
};

const mapStore = ({CreateCourseStore}) => {
  return {
    setTargetComponent: CreateCourseStore.setTargetComponent,
    targetComponent: CreateCourseStore.targetComponent
  };
};

export default magic(RadioCreator, {store: mapStore});