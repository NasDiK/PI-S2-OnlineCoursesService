/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import enums from '@local/enums';
import TextField from './FieldTypes/TextField';
import Select, {IOption} from './FieldTypes/Select';

interface iPossibleProps {
  onChange?: (val: string) => void,
  type: number,
  'value'?: string | number,
  placeholder?: string,
  fullWidth?: boolean,
  size?: 'small' | 'medium',
  variant?: 'outline' | 'standart',
  options?: ArrayLike<IOption>
}

const getFieldByType = (type: number, props: any) => {
  switch (type) {
    case enums.shared.fieldType.SELECT:
      return <Select {...props} />;
    case enums.shared.fieldType.TEXT:
      return <TextField {...props} />;
    default:
      return null;
  }
};

const DirectoryField = (props: iPossibleProps) => {
  const {type, ...otherProps} = props;

  return getFieldByType(type, otherProps);
};

export default DirectoryField;

/*
  Типовые пропсы:

  onChange = (val) => void;
*/