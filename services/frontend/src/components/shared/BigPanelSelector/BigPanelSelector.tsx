import React from 'react';
import LeftColumnView from './LeftColumn/LeftColumnView';
import RightColumnView from './RightColumnView';
import s from './BigPanelSelector.module.scss';
import {iElement} from './Components/ColumnElement';

interface iProps {
  element: iElement,
  renderableComponent: React.ReactNode,
  elementLink?: string
}

const BigPanelSelector = (props: iProps) => (
  <div className={s.wrapper}>
    <LeftColumnView element={props.element} elementLink={props.elementLink} />
    <RightColumnView component={props.renderableComponent} />
  </div>
);

export default BigPanelSelector;