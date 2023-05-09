/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import {IOption} from './Select';
import s from './field.module.scss';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {tryConvertToNumber} from '../../../../../utils';

interface iProps {
  options?: Array<IOption>,
  onChange: (_val) => void,
  isEditable?: boolean,
  editCallback?: (obj) => void, //{val, before, after}
  deleteCallback?: (val) => void, //returns value удаленного
  isDeletable?: boolean,
  // eslint-disable-next-line max-len, id-denylist
  value?: any,
  isDone?: boolean //readonly
}

const executeClick = (values: Array<any>, checked: boolean, curV) => {

  const _convertedValues = values.map((_) => tryConvertToNumber(_)[1]);
  const _convertedCurV = tryConvertToNumber(curV)[1];

  if (checked) {
    if (!_convertedValues.includes(_convertedCurV)) {
      return [..._convertedValues, _convertedCurV];
    }

    return [];
  }

  return _convertedValues.filter((_val) => _val !== _convertedCurV);
};

const CheckboxGroup = (props: iProps) => {
  const {
    options,
    onChange,
    value: selectedVal = [],
    isEditable,
    isDeletable,
    editCallback,
    deleteCallback,
    isDone
  } = props;

  const handleEditElement = (val, before, func) => {
    if (isEditable) {
      //Возвращает {val, before, after}
      const after = prompt('');

      return after && func({val, before, after});
    }
  };

  const handleDeleteElement = (val, func) => {
    if (isDeletable && confirm('Реально?')) {
      return func(val);
    }
  };

  let toRender: Array<React.ReactNode> = [null];

  if (options?.length) {

    toRender = options?.map(({value: val, label}, idx) => (
      <div key={idx} className={s.option}>
        <label>
          <input
            type={'checkbox'}
            value={val}
            checked={selectedVal.includes(val)}
            onChange={
              (ev) => {
                if (isDone) {
                  return;
                }

                const newValues = executeClick(
                  selectedVal,
                  ev.target.checked,
                  ev.target.value
                );

                onChange(newValues);
              }
            }
          />
          {label}
        </label>
        {
          isEditable && (
            <EditIcon
              sx={
                {
                  height: 12,
                  width: 12
                }
              }
              onClick={() => handleEditElement(val, label, editCallback)}
            />
          )
        }
        {
          isDeletable && (
            <DeleteIcon
              sx={
                {
                  height: 12,
                  width: 12
                }
              }
              onClick={() => handleDeleteElement(val, deleteCallback)}
            />
          )
        }
      </div>
    ));
  }

  if (toRender?.length && toRender[0] !== null) {
    return (
      <div className={s.radioGroup}>
        {toRender}
      </div>
    );
  }

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <React.Fragment>{toRender}</React.Fragment>;
};

export default CheckboxGroup;