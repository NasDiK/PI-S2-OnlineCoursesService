import React from 'react';
import {BigPanelSelector} from '../../shared';
import {iElement} from '../../shared/BigPanelSelector/Components/ColumnElement';
import enums from '@local/enums';

const elementsMock: iElement[] = [
  {
    id: 1,
    name: 'kek1',
    isDone: true,
    type: enums.shared.targetFields.COURSE,
    subGroup: [
      {
        id: 2,
        name: 'kek1.1',
        type: enums.shared.targetFields.TASK
      }
    ]
  },
  {
    id: 3,
    name: 'kek2',
    type: enums.shared.targetFields.TASK
  }
];

// eslint-disable-next-line no-console
console.log(elementsMock);

const CoursePageView = () => (
  // eslint-disable-next-line react/jsx-no-useless-fragment
  <React.Fragment>
    <BigPanelSelector
      elements={elementsMock}
    />
  </React.Fragment>
);

export default CoursePageView;