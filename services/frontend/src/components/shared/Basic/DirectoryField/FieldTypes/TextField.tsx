import React from 'react';
import s from './field.module.scss';
import {makeStyles} from '@mui/styles';
import cn from 'classnames';

interface TextFieldProps {
  placeholder?: string,
  'value'?: string | number,
  variant?: 'normal',
  size?: 'small' | 'medium'
  fullWidth?: boolean,
  onChange: (val) => VoidFunction;
}

const useStyles = makeStyles(() => {
  return {
    small: {
      fontSize: 14
    },
    medium: {
      fontSize: 20
    },
    fullWidth: {
      width: '100%',
      position: 'relative'
    }
  };
});

const TextField = (props: TextFieldProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {placeholder, value: fieldValue, variant, size = 'small', fullWidth, onChange} = props;
  //пока не понимаю предназначение variant
  const classes = useStyles();

  return (
    <input
      type={'text'}
      value={fieldValue}
      placeholder={placeholder}
      onChange={(ev) => onChange(ev.target.value)}
      className={
        cn(
          s.textField,
          {
            [classes.small]: size === 'small',
            [classes.medium]: size === 'medium',
            [classes.fullWidth]: fullWidth
          }
        )
      }
    />
  );
};

export default TextField;