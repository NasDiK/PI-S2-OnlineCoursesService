import s from './BigPanelSelector.module.scss';
import React from 'react';
import BlockElements from './BlockElements';

const columns = [
  {
    id: 1,
    name: 'kek'
  },
  {
    id: 2,
    name: 'kek2'
  }
];

const LeftColumnView = () => (
  <div className={s.leftColumn}>
    <BlockElements columns={columns} />
  </div>
);

export default LeftColumnView;