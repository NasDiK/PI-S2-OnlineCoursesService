/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {useEffect, useState} from 'react';
import s from './Components/styles.module.scss';
import {Typography, Button} from '../../shared';
import CourseCard from './Components/CourseCard';
import {getCoursesListByUsers} from '../../../api/courses';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import Drawers from './Components/Drawers';
import PropTypes from 'prop-types';
import {magic} from '../../../mobxUtils';

const renderCourseCard = ({id, title, description}) => (
  <CourseCard
    key={id}
    title={title}
    description={description}
    id={id}
  />
);

const CoursesPageView = ({UserStore}) => {
  const {userId} = UserStore;
  const [coursesList, setCoursesList] = useState<any>();
  const [isCreateDrawerOpen, setIsCreateDrawerOpen] = useState<boolean>(false);
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState<boolean>(false);

  useEffect(() => {
    getCoursesListByUsers([userId]).then((courses) => {
      setCoursesList(courses);
    });
  }, [userId]);

  return (
    <React.Fragment>
      <div className={s.courseContent}>
        <div className={s.text}>
          <Typography variant={'body24'} weight={'bold'}>{'Мои курсы'}</Typography>
          <Button
            variant={'icon'}
            onClick={() => setIsCreateDrawerOpen(true)}
          >
            <AddIcon
              sx={{width: '24px', height: '24px', cursor: 'pointer'}}
            />
          </Button>
          <Button
            variant={'icon'}
            onClick={() => setIsEditDrawerOpen(true)}
          >
            <EditIcon
              sx={{width: '24px', height: '24px', cursor: 'pointer'}}
            />
          </Button>
        </div>
        <div className={s.cards}>
          {coursesList?.map((el) => renderCourseCard(el))}
        </div>
      </div>
      <Drawers
        type={'create'}
        isOpen={isCreateDrawerOpen}
        onClose={() => setIsCreateDrawerOpen(false)}
      />
      <Drawers
        type={'edit'}
        isOpen={isEditDrawerOpen}
        onClose={() => setIsEditDrawerOpen(false)}
      />
    </React.Fragment>

  );
};

CoursesPageView.propTypes = {
  UserStore: PropTypes.object
};

export default magic(CoursesPageView, {store: 'UserStore'});
