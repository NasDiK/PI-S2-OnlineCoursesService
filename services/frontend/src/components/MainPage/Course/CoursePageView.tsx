import React from 'react';
import {BigPanelSelector} from '../../shared';
import {iElement} from '../../shared/BigPanelSelector/Components/ColumnElement';
import enums from '@local/enums';
import Task from './Components/Task';

const elementMock: iElement = {
  id: 1,
  name: 'kek1',
  isDone: true,
  type: enums.shared.targetFields.ELEMENT_GROUP,
  progress: 10,
  subGroup: [
    {
      id: 2,
      name: 'kek1.1',
      type: enums.shared.targetFields.ELEMENT_GROUP,
      subGroup: [
        {
          id: 4,
          name: 'kek1.1.1',
          type: enums.shared.targetFields.ELEMENT
        },
        {
          id: 5,
          name: 'kek1.1.2',
          type: enums.shared.targetFields.ELEMENT
        }
      ]
    },
    {
      id: 3,
      name: 'kek2',
      type: enums.shared.targetFields.ELEMENT
    }
  ]
};

// eslint-disable-next-line no-console
console.log(elementMock);

interface iProps {
  courseId: number;
}

const CoursePageView = (props: iProps) => (
  // eslint-disable-next-line react/jsx-no-useless-fragment
  <React.Fragment>
    <BigPanelSelector
      element={elementMock}
      renderableComponent={<Task />}
      elementLink={`/course/${props.courseId}/`}
    />
  </React.Fragment>
);

export default CoursePageView;