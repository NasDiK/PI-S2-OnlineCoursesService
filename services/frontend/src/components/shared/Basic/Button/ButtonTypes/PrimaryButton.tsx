import {makeStyles} from '@mui/styles';
import React from 'react';
import s from '../Button.module.scss';
import cn from 'classnames';

const useStyles = makeStyles(() => {
  return {
    button: {
      padding: '2px 4px'
    },
    small: {
      borderRadius: 2
    },
    fullWidth: {
      width: '100%'
    }
  };
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const primary = (props: any) => {
  const {children, size = 'small', fullWidth, onClick, backgroundColor} = props;

  const classes = useStyles();

  return (
    <button
      className={
        cn(
          classes.button,
          {
            [classes.small]: size === 'small',
            [classes.fullWidth]: fullWidth
          },
          s.primary
        )
      }
      style={backgroundColor && {backgroundColor}}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default primary;