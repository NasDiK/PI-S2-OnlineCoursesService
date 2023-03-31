import React, {useEffect, useState} from 'react';
import s from './Components/styles.module.scss';
import Typography from '../../shared/Basic/Typography/Typography';
import CourseCard from './Components/CourseCard';
import {getCoursesList, searchCourses} from '../../../api/courses';

const renderCourse = (course) => (
  <CourseCard
    key={course.id}
    title={course.title}
    description={course.description}
    id={course.id}
  />
);

const render = (courses) => {

  // eslint-disable-next-line no-console
  console.log(courses);

  return courses.map((el) => renderCourse(el));
};
const CoursesPageView = () => {
  // eslint-disable-next-line
  const [mainElement, setElements] = useState<any>();

  getCoursesList([6, 7]).then((x) => {
    const res = x;

    // eslint-disable-next-line no-console
    //console.log(res);
  });
  useEffect(() => {
    searchCourses().then((x) => {
      const {courses} = x;

      // eslint-disable-next-line max-nested-callbacks
      /*      const coursesElements = courses.map((el) => (
        (
          <div key={el.id} className={s.card}>
            <CourseCard key={el.id} title={el.title} description={el.description} id={el.id} />
          </div>
        )
      ));

      // eslint-disable-next-line no-console
      console.log(coursesElements);*/
      // eslint-disable-next-line no-console
      console.log(courses);
      setElements(courses);
    });
  }, []);

  return (
    <div className={s.courseContent}>
      <div className={s.text}>
        <Typography variant={'body24'} weight='bold'>{'Мои курсы'}</Typography>
      </div>
      <div className={s.cards}>
        {render(mainElement)}
      </div>
    </div>
  );
};

export default CoursesPageView;