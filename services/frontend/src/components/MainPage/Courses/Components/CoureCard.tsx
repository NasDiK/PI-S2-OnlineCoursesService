import React from 'react';
import s from './Card.module.scss';
import Typography from '../../../shared/Basic/Typography/Typography';
import Button from '../../../shared/Basic/Button/Button';
import {useNavigate} from 'react-router';

const CourseCard = () => {
  const navigate = useNavigate();
  const moveToCourse = () => {
    navigate('/course/1/1');
  };

  return (
    <div className={s.card}>
      <div className={s.cardBody}>
        <div className={s.courseHeader}>
          <Typography variant={'body20'} weight='bold'>{'Заголовок курса'}</Typography>
          <div className={s.courseDescription}>
            <Typography variant={'body14'}>{'Описание курса'}</Typography>
          </div>
        </div>
      </div>
      <div className={s.courseFooter}>
        <div className={s.footerButton}>
          <Button
            variant={'primary'}
            onClick={
              () => moveToCourse()
            }
          >{'Перейти в карточку'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;