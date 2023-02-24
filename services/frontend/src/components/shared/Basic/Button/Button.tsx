/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react';

type ButtonProps = {
  variant: 'thin' | 'primary' | 'roundThin'
};

const Button = (props: ButtonProps) => {
  const {variant} = props;

  switch (variant) {
    case 'thin':
      return <React.Fragment>{'thin'}</React.Fragment>;
    case 'primary':
      return <React.Fragment>{'primary'}</React.Fragment>;
    case 'roundThin':
      return <React.Fragment>{'roundThin'}</React.Fragment>;
    default:
      return <button>{variant}</button>;
  }
};

export default Button;