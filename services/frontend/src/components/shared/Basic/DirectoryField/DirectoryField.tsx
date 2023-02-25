/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
// import {type as fieldTypeEnum} from '../../../../../../enums/fields';
import TextField from './FieldTypes/TextField';

const getFieldByType = (type: number, props: any) => {
  switch (type) {
    case 2://fieldTypeEnum.TEXT:
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