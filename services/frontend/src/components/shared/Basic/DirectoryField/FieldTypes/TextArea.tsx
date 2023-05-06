import React, {useEffect, useState} from 'react';
import s from './field.module.scss';
import cn from 'classnames';

interface iProps {
  'value'?: string,
  isDone?: boolean,
  onChange: (val) => void,
  textAreaVariant?: 'review' | 'simple',
  placeholder?: string
}

const TextArea = (props: iProps) => {
  const {value: val = '', isDone = false, onChange, textAreaVariant = 'review'} = props;
  const [_val, _setVal] = useState(val);

  useEffect(() => {
    _setVal(val || '');
  }, [val]);

  if (textAreaVariant === 'simple') {
    return (
      <textarea
        className={s.simpleTextArea}
        onChange={
          (ev) => {
            onChange(ev.target.value);
          }
        }
        value={val}
        placeholder={props.placeholder}
      />
    );
  }

  return (
    <div className={s.textArea}>
      <div className={s.lineCounter}>
        {
          _val?.split('\n')?.map((_, index) => <div key={index}>{index + 1}</div>)
        }
      </div>
      <textarea
        className={
          cn(s.element, {
            [s['textarea-done']]: isDone
          })
        }
        readOnly={isDone}
        onChange={
          (ev) => {
            _setVal(ev.target.value);
            onChange(ev.target.value);
          }
        }
        value={_val}
      />
    </div>
  );
};

export default TextArea;