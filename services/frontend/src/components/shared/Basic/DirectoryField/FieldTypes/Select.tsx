import React from 'react';
import {Select, MenuItem} from '@mui/material';

interface IOption {
  'value': any,
  label: string
}
interface SelectProps {
  variant?: 'outline' | 'normal',
  size?: 'small' | 'medium',
  options?: ArrayLike<IOption>
}

const getSelectByType = (variant: string, props: SelectProps) => {
  const {options, size} = props;

  switch (variant) {
    case 'outline':
      return (
        <Select
          variant={'outlined'}
          size={size}
        >
          <MenuItem value={10}>{'Ten11'}</MenuItem>
          <MenuItem value={20}>{'Twenty22'}</MenuItem>
          <MenuItem value={30}>{'Thirty33'}</MenuItem>
        </Select>
      );
    case 'normal':
      return (
        <Select
          variant={'standard'}
          size={size}
        >
          <MenuItem value={10}>{'Ten'}</MenuItem>
          <MenuItem value={20}>{'Twenty'}</MenuItem>
          <MenuItem value={30}>{'Thirty'}</MenuItem>
        </Select>
      );
    default:
      return null;
  }
};

const SelectComponent = (props: SelectProps) => {
  const {variant = 'normal', ...otherProps} = props;

  return getSelectByType(variant, otherProps);
};

export default SelectComponent;