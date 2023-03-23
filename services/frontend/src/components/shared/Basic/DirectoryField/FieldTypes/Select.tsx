import React from 'react';
import {Select, MenuItem} from '@mui/material';

export interface IOption {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  'value': any,
  label: string
}
interface SelectProps {
  variant?: 'outline' | 'normal',
  size?: 'small' | 'medium',
  options?: ArrayLike<IOption>,
  onChange: (val) => VoidFunction;
}

const getSelectByType = (variant: string, props: SelectProps) => {
  //TODO доработать options
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {options, size, onChange} = props;

  switch (variant) {
    case 'outline':
      return (
        <Select
          variant={'outlined'}
          size={size}
          onChange={(ev) => onChange(ev.target.value)}
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