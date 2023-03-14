import React from 'react';
import s from './BigPanelSelector.module.scss';

interface iProps {
  component?: React.ReactNode
}

const RightColumnView = (props: iProps) => (
  <div className={s.rightColumn}>
    {props.component}
  </div>
);

export default RightColumnView;