import React from 'react';
import LeftColumnView from './LeftColumn/LeftColumnView';
import RightColumnView from './RightColumnView';
import s from './BigPanelSelector.module.scss';
import {iElement} from './Components/ColumnElement';

interface iProps {
  elements: iElement[]
}

const BigPanelSelector = (props: iProps) => (
  <div className={s.wrapper}>
    <LeftColumnView elements={props.elements} />
    <RightColumnView />
  </div>
);

export default BigPanelSelector;