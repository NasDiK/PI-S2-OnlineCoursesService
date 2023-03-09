/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable camelcase */
import React from 'react';
import CoursePageView from './CoursePageView';
import {useMatches} from 'react-router';

type MatchesParams = {
  params: {
    couse_id: string,
    task_id: string
  }
}

const CoursePage = () => {
  const [match] = useMatches();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const {course_id, task_id}: any = match.params;

  // eslint-disable-next-line no-console
  console.log(course_id, task_id);

  return (
    <React.Fragment>
      {/* {'Тут будет провайдер сторы'} */}
      <CoursePageView />
    </React.Fragment>
  );
};

export default CoursePage;