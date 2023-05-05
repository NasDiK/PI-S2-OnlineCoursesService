import React from 'react';
import LeftColumnView from './LeftColumn/LeftColumnView';
import RightColumnView from './RightColumnView';
import s from './BigPanelSelector.module.scss';
import {iElement} from './Components/ColumnElement';

interface iProps {
  element: iElement,
  renderableComponent: React.ReactNode,
  elementLink?: string,
  withLinear?: boolean,
  onClickElement?: (element) => void //Если будет передан, то elementLink - не отработает
  onClickGroup?: (element) => void //Будет отрабатывать на каждый клик по targetFields.ELEMENT_GROUP
}

const BigPanelSelector = (props: iProps) => (
  <div className={s.wrapper}>
    <LeftColumnView
      element={props.element}
      withLinear={props.withLinear}
      elementLink={props.elementLink}
      onClickElement={props.onClickElement}
      onClickGroup={props.onClickGroup}
    />
    <RightColumnView component={props.renderableComponent} />
  </div>
);

export default BigPanelSelector;