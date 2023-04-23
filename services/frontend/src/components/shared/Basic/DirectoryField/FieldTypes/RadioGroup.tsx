import React from 'react';
import {IOption} from './Select';
import s from './field.module.scss';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {isValEmpty} from '../../../../../utils';

interface iProps {
  options?: Array<IOption>,
  onChange: (_val) => void,
  isEditable?: boolean,
  editCallback?: (obj) => void, //{val, before, after}
  deleteCallback?: (val) => void, //returns value удаленного
  isDeletable?: boolean,
  // eslint-disable-next-line max-len
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, id-denylist, react/no-unused-prop-types
  value?: any
}

const RadioGroup = (props: iProps) => {
  const {
    options, onChange, isEditable, editCallback, deleteCallback, isDeletable, value: selectedVal
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
    const renderId = Math.round(Math.random() * 9999999);
    const renderId2 = Math.round(Math.random() * 9999999);

    toRender = options?.map(({value: val, label}, idx) => (
      <div key={idx} className={s.option}>
        <label>
          <input
            type={'radio'}
            value={val}
            name={`${renderId}-${renderId2}`}
            onChange={(ev) => onChange(ev.target.value)}
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

export default RadioGroup;