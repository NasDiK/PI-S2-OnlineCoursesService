import CreateDrawer from './CreateCourse';
import EditDrawer from './EditCourse';
import React from 'react';

interface iPossibleProps {
  type: 'create' | 'edit',
  isOpen: boolean,
  onClose: () => void
}

const CourseDrawers = (props: iPossibleProps) => {
  const {type, ...otherProps} = props;

  switch (type) {
    case 'create':
      return <CreateDrawer {...otherProps} />;
    case 'edit':
      return <EditDrawer {...otherProps} />;
    default:
      return null;
  }
};

export default CourseDrawers;