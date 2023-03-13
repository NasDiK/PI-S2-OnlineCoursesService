import React from 'react';
import LeftColumnView from './LeftColumn/LeftColumnView';
import RightColumnView from './RightColumnView';
import s from './BigPanelSelector.module.scss';

const BigPanelSelector = () => (
  <div className={s.wrapper}>
    <LeftColumnView />
    <RightColumnView />
  </div>
);

export default BigPanelSelector;