/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import CoursePageView from './CoursePageView';
import {useMatches} from 'react-router';

const CoursePage = () => {
  const [match] = useMatches();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const {courseId, taskId}: any = match.params;

  // eslint-disable-next-line no-console
  console.log(courseId, taskId);

  return (
    <React.Fragment>
      {/* {'Тут будет провайдер сторы'} */}
      <CoursePageView courseId={Number(courseId)} />
    </React.Fragment>
  );
};

export default CoursePage;