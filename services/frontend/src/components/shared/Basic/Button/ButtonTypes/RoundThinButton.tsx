/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import s from '../Button.module.scss';
import cn from 'classnames';

type RoundThinButtonProps = {
  size?: 'small' | 'normal',
  children?: React.ReactNode,
  onClick?: any
}

const RoundThinButton = (props: RoundThinButtonProps) => {
  const {children, size = 'normal', onClick} = props;

  return (
    <button
      className={
        cn(
          s.roundThin,
          {
            [s.small]: size === 'small',
            [s.normal]: size === 'normal'
          }
        )
      }
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default RoundThinButton;