/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import s from '../Button.module.scss';
import cn from 'classnames';

type ThinButtonProps = {
  size?: 'small' | 'normal',
  children?: React.ReactNode,
  onClick?: any //функция обработчика
}

const ThinButton = (props: ThinButtonProps) => {
  const {children, size = 'normal', onClick} = props;

  return (
    <button
      className={
        cn(
          s.thin,
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

export default ThinButton;