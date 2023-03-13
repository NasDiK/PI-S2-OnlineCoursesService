import React from 'react';
import {BigPanelSelector} from '../../shared';
import {iElement} from '../../shared/BigPanelSelector/Components/ColumnElement';

const elementsMock: iElement[] = [
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

const CoursePageView = () => (
  // eslint-disable-next-line react/jsx-no-useless-fragment
  <React.Fragment>
    <BigPanelSelector
      elements={elementsMock}
    />
  </React.Fragment>
);

export default CoursePageView;