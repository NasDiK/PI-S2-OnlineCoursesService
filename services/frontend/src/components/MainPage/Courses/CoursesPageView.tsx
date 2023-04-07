import React, {useEffect, useState} from 'react';
import s from './Components/styles.module.scss';
import Typography from '../../shared/Basic/Typography/Typography';
import CourseCard from './Components/CourseCard';
import {getCoursesListByUsers} from '../../../api/courses';
import {useSelector} from 'react-redux';

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
  const userId = useSelector((state: any) => state.userStore.userData.userId);
  // eslint-disable-next-line
  const [mainElement, setMainElement] = useState<any>();

  useEffect(() => {
    getCoursesListByUsers([userId]).then((x) => {
      setMainElement(x);
    });
  }, [userId]);

  return (
    <div className={s.courseContent}>
      <div className={s.text}>
        <Typography variant={'body24'} weight={'bold'}>{'Мои курсы'}</Typography>
      </div>
      <div className={s.cards}>
        {mainElement?.courses.map((el) => renderCourseCard(el))}
      </div>
    </div>
  );
};

export default CoursesPageView;