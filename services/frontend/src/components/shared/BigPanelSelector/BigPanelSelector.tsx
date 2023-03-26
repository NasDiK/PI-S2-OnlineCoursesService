import React from 'react';
import LeftColumnView from './LeftColumn/LeftColumnView';
import RightColumnView from './RightColumnView';
import s from './BigPanelSelector.module.scss';
import {iElement} from './Components/ColumnElement';

interface iProps {
  element: iElement,
  renderableComponent: React.ReactNode,
  elementLink: string,
  withLinear?: boolean
}

const BigPanelSelector = (props: iProps) => (
  <div className={s.wrapper}>
    <LeftColumnView
      element={props.element}
      withLinear={props.withLinear}
      elementLink={props.elementLink}
    />
    <RightColumnView component={props.renderableComponent} />
  </div>
);

export default BigPanelSelector;