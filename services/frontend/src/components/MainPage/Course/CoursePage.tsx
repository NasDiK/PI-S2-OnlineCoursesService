import React from 'react';
import CoursePageView from './CoursePageView';
import {Provider as MobxProvider, magic} from '../../../mobxUtils';
import {CourseStore} from '../../../stores/components/Course/CourseStore';
import PropTypes from 'prop-types';

class CoursePage extends React.Component {
  courseStore: CourseStore;
  static propTypes: { UserStore: PropTypes.Requireable<object>; };

  constructor(props) {
    super(props);

    const {UserStore} = props;

    this.courseStore = new CourseStore({UserStore});
  }

  componentWillUnmount(): void {
    this.courseStore.disposeAll();
  }

  render() {
    return (
      <MobxProvider CourseStore={this.courseStore}>
        <CoursePageView />
      </MobxProvider>
    );
  }
}

CoursePage.propTypes = {
  UserStore: PropTypes.object
};

export default magic(CoursePage, {store: 'UserStore'});