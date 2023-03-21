/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {useState} from 'react';
import {IOption} from './Select';
import s from './field.module.scss';

interface iProps {
  options?: Array<IOption>,
  onChange: (_val) => void
}

const executeClick = (values: Array<any>, checked: boolean, curV) => {
  if (checked) {
    if (!values.includes(curV)) {
      return [...values, curV];
    }

    return [];
  }

  return values.filter((_val) => _val !== curV);
};

const CheckboxGroup = (props: iProps) => {
  const {options, onChange} = props;
  const [values, setValues] = useState<Array<any>>([]);
  let toRender: Array<React.ReactNode> = [null];

  if (options?.length) {

    toRender = options?.map(({value: val, label}, idx) => (
      <label key={idx}>
        <input
          type={'checkbox'}
          value={val}
          onChange={
            (ev) => {
              const newValues = executeClick(values, ev.target.checked, ev.target.value);

              onChange(newValues);
              setValues(newValues);
            }
          }
        />
        {label}
      </label>
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