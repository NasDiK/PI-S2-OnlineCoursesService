/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react';
import primary from './ButtonTypes/PrimaryButton';
import thin from './ButtonTypes/ThinButton';
import roundThin from './ButtonTypes/RoundThinButton';
import iconButton from './ButtonTypes/IconButton';

export type ButtonProps = {
  variant?: 'thin' | 'primary' | 'roundThin' | 'icon',
  size?: 'small' | 'normal',
  children?: React.ReactNode,
  padding?: string,
  fullWidth?: boolean,
  onClick?: any, //функция обработчика,
  backgroundColor?: string
};

const Button = (props: ButtonProps) => {
  const {variant, ...otherProps} = props;

  switch (variant) {
    case 'thin':
      return thin(otherProps);
    case 'primary':
      return primary(otherProps);
    case 'roundThin':
      return roundThin(otherProps);
    case 'icon':
      return iconButton(otherProps);
    default:
      return primary(otherProps);
  }
};

export default Button;