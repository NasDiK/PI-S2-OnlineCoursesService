import React, {useEffect, useState} from 'react';
import s from './Components/styles.module.scss';
import Typography from '../../shared/Basic/Typography/Typography';
import CourseCard from './Components/CourseCard';
import {getCoursesList} from '../../../api/courses';

const renderCourseCard = (course) => (
  <CourseCard
    key={course.id}
    title={course.title}
    description={course.description}
    id={course.id}
  />
);

const CoursesPageView = () => {
  // eslint-disable-next-line
  const [mainElement, setMainElement] = useState<any>();

  useEffect(() => {
    getCoursesList([6, 7]).then((x) => {
      setMainElement(x);
      // eslint-disable-next-line no-console
      console.log(mainElement);
    });
  }, []);

  // eslint-disable-next-line no-console
  console.log(mainElement);

  return (
    <div className={s.courseContent}>
      <div className={s.text}>
        <Typography variant={'body24'} weight='bold'>{'Мои курсы'}</Typography>
      </div>
      <div className={s.cards}>
        {mainElement?.length && mainElement.courses.map((el) => renderCourseCard(el))}
      </div>
    </div>
  );
};

export default CoursesPageView;