import s from '../BigPanelSelector.module.scss';
import React from 'react';
import BlockElements from '../BlockElements';
import Header from './Header';
import {iElement} from '../Components/ColumnElement';

interface iProps {
  elements: iElement []
}

const LeftColumnView = (props: iProps) => (
  <div className={s.leftColumn}>
    <Header title={'Основы программирования'} withLinear={true} value={10} />
    <div className={s.blockWrapper}>
      <BlockElements elements={props.elements} />
    </div>
  </div>
);

export default LeftColumnView;