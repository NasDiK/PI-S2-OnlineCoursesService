import React from 'react';
import {IOption} from './Select';
import s from './field.module.scss';

interface iProps {
  options?: Array<IOption>,
  onChange: (_val) => void
}

const RadioGroup = (props: iProps) => {
  const {options, onChange} = props;
  let toRender: Array<React.ReactNode> = [null];

  if (options?.length) {
    const renderId = Math.round(Math.random() * 9999999);
    const renderId2 = Math.round(Math.random() * 9999999);

    toRender = options?.map(({value: val, label}, idx) => (
      <label key={idx}>
        <input
          type={'radio'}
          value={val}
          name={`${renderId}-${renderId2}`}
          onChange={(ev) => onChange(ev.target.value)}
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

export default RadioGroup;