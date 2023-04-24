import {Provider} from 'react-redux';
import CreateEditDrawer from './CreateCourse';
import EditDrawer from './EditCourse';
import React from 'react';
import {store as createDrawerReducer}
  from '../../../../../stores/components/Courses/CreateDrawersReducer';

interface iPossibleProps {
  type: 'create' | 'edit',
  isOpen: boolean,
  onClose: () => void
}

const CourseDrawers = (props: iPossibleProps) => {
  const {type, ...otherProps} = props;

  switch (type) {
    case 'create':
      return (
        <Provider store={createDrawerReducer}>
          <CreateEditDrawer {...otherProps} />
        </Provider>
      );
    case 'edit':
      return (
        <Provider store={createDrawerReducer}>
          <CreateEditDrawer view={'edit'} {...otherProps} />
        </Provider>
      );
    default:
      return null;
  }
};

export default CourseDrawers;