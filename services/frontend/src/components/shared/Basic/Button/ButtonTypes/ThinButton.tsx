import React from 'react';
import s from '../Button.module.scss';
import cn from 'classnames';

type ThinButtonProps = {
  size?: 'small' | 'normal',
  children?: React.ReactNode
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ThinButton = (props: ThinButtonProps) => {
  const {children, size = 'normal'} = props;

  return (
    <button className={
      cn(
        s.thin,
        {
          [s.small]: size === 'small',
          [s.normal]: size === 'normal'
        }
      )
    }
    >
      {children}
    </button>
  );
};

export default ThinButton;