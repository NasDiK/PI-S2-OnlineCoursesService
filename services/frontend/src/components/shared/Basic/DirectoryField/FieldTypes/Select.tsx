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
  options?: IOption[],
  fullWidth?: boolean,
  // eslint-disable-next-line id-denylist
  value?: number[] | string [],
  isMulti?: boolean,
  onChange: (val) => VoidFunction;
}

const getSelectByType = (variant: string, props: SelectProps) => {
  //TODO доработать options
  // eslint-disable-next-line @typescript-eslint/no-unused-vars,id-denylist
  const {options, size, onChange, value, isMulti} = props;

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
          multiple={isMulti}
          onChange={(ev) => onChange(ev.target.value)}
          sx={{width: '100%', position: 'relative'}}
          // eslint-disable-next-line id-denylist
          value={value}
        >
          {
            options?.map((el, index) =>
              <MenuItem key={index} value={el.value}>{el.label}</MenuItem>)
          }
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