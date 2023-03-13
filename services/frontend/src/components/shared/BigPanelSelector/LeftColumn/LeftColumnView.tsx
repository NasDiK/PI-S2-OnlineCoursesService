import s from '../BigPanelSelector.module.scss';
import React from 'react';
import BlockElements from '../BlockElements';
import Header from './Header';
import {iElement} from '../Components/ColumnElement';

const elements: iElement[] = [
  {
    id: 1,
    name: 'kek',
    isDone: true,
    subGroup: []
  },
  {
    id: 2,
    name: 'kek2'
  },
  {
    id: 2,
    name: 'kek2'
  },
  {
    id: 2,
    name: 'kek2'
  },
  {
    id: 2,
    name: 'kek2'
  },
  {
    id: 2,
    name: 'kek2'
  },
  {
    id: 2,
    name: 'kek2'
  },
  {
    id: 2,
    name: 'kek2'
  },
  {
    id: 2,
    name: 'kek2'
  },
  {
    id: 2,
    name: 'kek2'
  },
  {
    id: 2,
    name: 'kek2'
  },
  {
    id: 2,
    name: 'kek2'
  },
  {
    id: 2,
    name: 'kek2'
  },
  {
    id: 2,
    name: 'kek2'
  },
  {
    id: 2,
    name: 'kek2'
  },
  {
    id: 2,
    name: 'kek2'
  },
  {
    id: 2,
    name: 'kek2'
  },
  {
    id: 2,
    name: 'kek2'
  },
  {
    id: 2,
    name: 'kek2'
  },
  {
    id: 2,
    name: 'kek2'
  },
  {
    id: 2,
    name: 'kek3333'
  }
];

const LeftColumnView = () => (
  <div className={s.leftColumn}>
    <Header title={'Основы программирования'} withLinear={true} value={10} />
    <div className={s.blockWrapper}>
      <BlockElements elements={elements} />
    </div>
  </div>
);

export default LeftColumnView;