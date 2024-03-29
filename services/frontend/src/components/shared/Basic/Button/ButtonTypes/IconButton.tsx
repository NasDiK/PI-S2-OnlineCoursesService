import React from 'react';
import {ButtonProps} from '../Button';
import s from '../Button.module.scss';
import cn from 'classnames';

const IconButton = (props: ButtonProps) => (
  <button
    className={
      cn(s.iconButton)
    }
    onClick={props.onClick}
  >{props.children}
  </button>
);

export default IconButton;