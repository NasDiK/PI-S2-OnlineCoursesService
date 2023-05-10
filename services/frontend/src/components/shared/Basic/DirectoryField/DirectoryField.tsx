/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import {shared} from '@local/enums';
import TextField from './FieldTypes/TextField';
import RadioGroup from './FieldTypes/RadioGroup';
import CheckboxGroup from './FieldTypes/CheckboxGroup';
import Select, {IOption} from './FieldTypes/Select';
import TextArea from './FieldTypes/TextArea';

interface iPossibleProps {
  onChange?: (val: string) => void,
  type: number,
  'value'?: string | number | number[] | string[],
  placeholder?: string,
  fullWidth?: boolean,
  size?: 'small' | 'medium',
  variant?: 'outline' | 'standart',
  options?: ArrayLike<IOption>
  isDone?: boolean, //readonly field
  name?: string, //Если включает в себя password, то шифруется. Например, password_auth
  isMulti?: boolean,
  textAreaVariant?: 'simple' | 'review',

  //для checkbox_group и radio_group
  isEditable?: boolean
  editCallback?: (obj) => void //{val, before, after}
  isDeletable?: boolean
  deleteCallback?: (val) => void //val удаляемой опции
}

const getFieldByType = (type: number, props: any) => {
  switch (type) {
    case shared.fieldType.SELECT:
      return <Select {...props} />;
    case shared.fieldType.TEXT:
      return <TextField {...props} />;
    case shared.fieldType.RADIO_GROUP:
      return <RadioGroup {...props} />;
    case shared.fieldType.CHECKBOX_GROUP:
      return <CheckboxGroup {...props} />;
    case shared.fieldType.TEXT_AREA:
      return <TextArea {...props} />;
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