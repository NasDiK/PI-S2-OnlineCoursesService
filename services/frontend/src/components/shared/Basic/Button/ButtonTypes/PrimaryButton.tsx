import {makeStyles} from '@mui/styles';
import React from 'react';
import cn from 'classnames';

const defaultColor = '#C5D1FF';

const useStyles = makeStyles(() => {
  return {
    button: {
      background: defaultColor,
      padding: '2px 4px'
    },
    small: {
      borderRadius: 2
    }
  };
});

//TODO: Доработать
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const primary = (props: any) => {
  const {children, size = 'small'} = props;

  const classes = useStyles();

  return (
    <button className={
      cn(
        classes.button,
        {
          [classes.small]: size === 'small'
        }
      )
    }
    >
      {children}
    </button>
  );
};

export default primary;