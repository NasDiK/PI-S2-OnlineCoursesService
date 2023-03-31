import React from 'react';
import s from './Card.module.scss';
import Typography from '../../../shared/Basic/Typography/Typography';
import Button from '../../../shared/Basic/Button/Button';
import {useNavigate} from 'react-router';
import PropTypes from 'prop-types';

const CourseCard = (props) => {
  const navigate = useNavigate();
  const moveToCourse = () => {
    navigate(`/course/${props.id}/1`);
  };

  return (
    <div className={s.card}>
      <div className={s.cardBody}>
        <div className={s.courseHeader}>
          <Typography variant={'body20'} weight={'bold'}>{props.title}</Typography>
          <div className={s.courseDescription}>
            <Typography variant={'body14'}>{props.description}</Typography>
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

CourseCard.propTypes = {
  id: PropTypes.node,
  title: PropTypes.node,
  description: PropTypes.node
};

export default CourseCard;