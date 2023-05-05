import {Provider as MobxProvider} from '../../../../../mobxUtils';
import CreateEditDrawer from './CreateCourse';
import React from 'react';
import CreateCourseStore from '../../../../../stores/components/Courses/CreateCourseStore';

interface iPossibleProps {
  type: 'create' | 'edit',
  isOpen: boolean,
  onClose: () => void
}

const CourseDrawers = (props: iPossibleProps) => {
  const {type, ...otherProps} = props;
  const createCourseStore = new CreateCourseStore(type);

  return (
    <MobxProvider CreateCourseStore={createCourseStore}>
      <CreateEditDrawer {...otherProps} type={type} />
    </MobxProvider>
  );
};

export default CourseDrawers;