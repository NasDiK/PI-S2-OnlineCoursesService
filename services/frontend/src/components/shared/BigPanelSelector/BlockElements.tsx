import React from 'react';
import ColumnElement, {iElement} from './Components/ColumnElement';
import s from './BigPanelSelector.module.scss';

interface iProps {
  elements: Array <iElement>
}

const BlockElements = ({elements}: iProps) => (
  <div className={s.blockElements}>
    {
      elements.map((element, index) =>
        <ColumnElement key={index} element={element} />)
    }
  </div>
);

export default BlockElements;