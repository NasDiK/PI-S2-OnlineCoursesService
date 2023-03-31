import React, {useEffect, useState} from 'react';
import s from './Components/styles.module.scss';
import Typography from '../../shared/Basic/Typography/Typography';
import CourseCard from './Components/CoureCard';
import {searchCourses} from '../../../api/courses';
const CoursesPageView = () => {
  // eslint-disable-next-line
  const [mainElement, setElements] = useState<any>();

  useEffect(() => {
    searchCourses().then((x) => {
      const {courses} = x;

      // eslint-disable-next-line max-nested-callbacks
      const coursesElements = courses.map((el) => (
        (
          <div key={el.id} className={s.card}>
            <CourseCard key={el.id} title={el.title} description={el.description} />
          </div>
        )
      ));

      setElements(coursesElements);
    });
  }, []);

  return (
    <div className={s.courseContent}>
      <div className={s.text}>
        <Typography variant={'body24'} weight='bold'>{'Мои курсы'}</Typography>
      </div>
      <div className={s.cards}>
        {mainElement}
      </div>
    </div>
  );
};

export default CoursesPageView;