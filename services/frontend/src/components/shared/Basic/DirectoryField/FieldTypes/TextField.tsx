import React from 'react';
import s from './field.module.scss';
import {makeStyles} from '@mui/styles';
import cn from 'classnames';

interface TextFieldProps {
  placeholder?: string,
  'value'?: string | number,
  variant?: 'normal' | null,
  size?: 'small' | 'medium' | null
  width?: 'full'
}

const useStyles = makeStyles(() => {
  return {
    small: {
      fontSize: 14
    },
    medium: {
      fontSize: 20
    },
    full: {
      width: '100%'
    }
  };
});

const TextField = (props: TextFieldProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {placeholder, value: fieldValue, variant, size = 'small', width = 'full'} = props;
  //пока не понимаю предназначение variant
  const classes = useStyles();

  return (
    <input
      type={'text'}
      value={fieldValue}
      placeholder={placeholder}
      className={
        cn(
          s.textField,
          {
            [classes.small]: size === 'small',
            [classes.medium]: size === 'medium',
            [classes.full]: width === 'full'
          }
        )
      }
    />
  );
};

export default TextField;