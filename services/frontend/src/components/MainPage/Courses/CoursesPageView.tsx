import React from 'react';
import s from './Components/styles.module.scss';
import Typography from '../../shared/Basic/Typography/Typography';
import CourseCard from './Components/CoureCard';

const CoursesPageView = () => (
  <div className={s.courseContent}>
    <div className={s.text}>
      <Typography variant={'body24'} weight='bold'>{'Мои курсы'}</Typography>
    </div>
    <div className={s.cards}>
      <div className={s.card}>
        <CourseCard />
      </div>
      <div className={s.card}>
        <CourseCard />
      </div>
      <div className={s.card}>
        <CourseCard />
      </div>
      <div className={s.card}>
        <CourseCard />
      </div>
      <div className={s.card}>
        <CourseCard />
      </div>
    </div>
  </div>
);

export default CoursesPageView;