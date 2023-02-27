/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react';
import primary from './ButtonTypes/PrimaryButton';

type ButtonProps = {
  variant?: 'thin' | 'primary' | 'roundThin',
  size?: 'small' | 'normal',
  children?: React.ReactNode,
  padding?: string,
  fullWidth?: boolean
};

const Button = (props: ButtonProps) => {
  const {variant, ...otherProps} = props;

  switch (variant) {
    case 'thin':
      return <React.Fragment>{'thin'}</React.Fragment>;
    case 'primary':
      return primary(otherProps);
    case 'roundThin':
      return <React.Fragment>{'roundThin'}</React.Fragment>;
    default:
      return primary(otherProps);
  }
};

export default Button;