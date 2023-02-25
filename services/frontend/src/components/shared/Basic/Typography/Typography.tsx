import React from 'react';
import {makeStyles} from '@mui/styles';
import cn from 'classnames';

type TypographyProps = {
  children?: React.ReactNode,
  variant?: 'body14' | 'body24' | 'body20',
  weight?: 'regular' | 'medium' | 'bold',
  className?: string
};

const useStyles = makeStyles(() => {
  return {
    //variant
    body14: {
      fontSize: 14,
      letterSpacing: '0.25px',
      lineHeight: '20px'
    },
    body24: {
      fontSize: 24,
      letterSpacing: '0.25px',
      lineHeight: '36px'
    },
    body20: {
      fontSize: 20,
      letterSpacing: '0.25px',
      lineHeight: '32px'
    },
    body32: {
      fontSize: 32,
      letterSpacing: '0.25px',
      lineHeight: '40px'
    },

    //weight
    regular: {
      fontWeight: 400
    },
    medium: {
      fontWeight: 500
    },
    bold: {
      fontWeight: 700
    }
  };
});

const Typography = (props: TypographyProps) => {
  const {children, variant = 'body14', weight = 'regular', className} = props;
  const classes = useStyles(props);

  return (
    <span className={
      cn(
        classes[variant],
        classes[weight],
        className
      )
    }
    >
      {children}
    </span>
  );
};

export default Typography;