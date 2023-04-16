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
  name?: string
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
  const {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    placeholder, value: fieldValue, variant, size = 'small', fullWidth, onChange, name
  } = props;
  //пока не понимаю предназначение variant
  const classes = useStyles();

  return (
    <input
      type={new RegExp('^password.*').test(name || '') && 'password' || 'text'}
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
      name={name}
    />
  );
};

export default TextField;