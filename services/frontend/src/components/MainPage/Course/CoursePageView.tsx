import React from 'react';
import {BigPanelSelector} from '../../shared';
import {iElement} from '../../shared/BigPanelSelector/Components/ColumnElement';

const elementsMock: iElement[] = [
  {
    id: 1,
    name: 'kek1',
    isDone: true,
    subGroup: [
      {
        id: 2,
        name: 'kek1.1'
      }
    ]
  },
  {
    id: 3,
    name: 'kek2'
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