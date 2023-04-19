import {Provider} from 'react-redux';
import CreateDrawer from './CreateCourse';
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
          <CreateDrawer {...otherProps} />
        </Provider>
      );
    case 'edit':
      return <EditDrawer {...otherProps} />;
    default:
      return null;
  }
};

export default CourseDrawers;