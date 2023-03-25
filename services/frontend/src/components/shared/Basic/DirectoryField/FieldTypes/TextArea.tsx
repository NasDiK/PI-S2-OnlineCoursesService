import React from 'react';

interface iProps {
  'value'?: string
}

const TextArea = (props: iProps) => {
  const {value: val} = props;

  return <textarea>{val}</textarea>;
};

export default TextArea;