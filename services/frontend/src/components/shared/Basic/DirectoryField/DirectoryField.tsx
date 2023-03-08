/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import enums from '@local/enums';
import TextField from './FieldTypes/TextField';
import Select from './FieldTypes/Select';

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

const DirectoryField = (props: any) => {
  const {type, ...otherProps} = props;

  return getFieldByType(type, otherProps);
};

export default DirectoryField;