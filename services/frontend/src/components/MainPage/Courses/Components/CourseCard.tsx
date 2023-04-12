import React from 'react';
import s from './Card.module.scss';
import {Typography, Button} from '../../../shared';
import {useNavigate} from 'react-router';
import PropTypes from 'prop-types';

const CourseCard = (props) => {
  const navigate = useNavigate();
  const moveToCourse = () => navigate(`/course/${props.id}/1`);

  return (
    <div className={s.card}>
      <div className={s.body}>
        <div className={s.header}>
          <Typography variant={'body20'} weight={'bold'}>{props.title}</Typography>
          <div className={s.description}>
            <Typography variant={'body14'}>{props.description}</Typography>
          </div>
        </div>
      </div>
      <div className={s.footer}>
        <div className={s.footerButton}>
          <Button
            variant={'primary'}
            onClick={() => moveToCourse()}
          >{'Перейти в карточку'}
          </Button>
        </div>
      </div>
    </div>
  );
};

CourseCard.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  description: PropTypes.string
};

export default CourseCard;