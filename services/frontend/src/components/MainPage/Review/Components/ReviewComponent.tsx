/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {useEffect, useState} from 'react';
import {useMatches} from 'react-router';
import s from '../ReviewPage.module.scss';
import {Button, DirectoryField, Typography} from '../../../shared';
import {fieldType} from '@local/enums/shared';
import {useSelector} from 'react-redux';
import {dateConverter} from '../../../../utils';
import {dateFormat as dateFormatList} from '@local/enums/tools';

const ReviewComponent = () => {
  const [{params: {id}}] = useMatches();
  const _reviewId = Number(id);
  const reviewList = useSelector((state: any) => state.reviewStore.reviewsList);
  const [curReview, setCurReview] = useState<any>();

  useEffect(() => {
    const _review = reviewList.find(({log_id: reviewId}) => _reviewId === reviewId);

    setCurReview(_review);

  }, [_reviewId, reviewList]);

  return (
    <div className={s.reviewWrapper}>
      <div className={s.taskTitle}>
        <Typography variant={'body24'} weight={'bold'}>{curReview?.task_title}</Typography>
      </div>
      <div className={s.taskWrapper}>
        <div className={s.notebox}>
          {
            <Typography weight={'bold'}>
              {`${curReview?.task_maxNote && `Максимум ${curReview?.task_maxNote} баллов` || ''}`}
            </Typography>
          }
          <Typography weight={'bold'}>
            {
              `Сдано ${
                dateConverter
                  .dateConverter(
                    curReview?.log_date, dateFormatList.DATE_FROM_NOW_WITH_TIME
                  )
                  .toLocaleLowerCase()
              }`
            }
          </Typography>
        </div>
        <div className={s.description}>
          <Typography variant={'body14'}>{curReview?.task_description}</Typography>
        </div>
      </div>
      <div className={s.answer}>
        <DirectoryField
          type={fieldType.TEXT_AREA}
          isDone={true}
          value={curReview?.log_value}
        />
        <div className={s.buttons}>
          <Button backgroundColor={'#FF0F00'}>{'Отклонить'}</Button>
          <Button backgroundColor={'#13FF47'}>{'Принять'}</Button>
        </div>
      </div>
    </div>
  );
};

export default ReviewComponent;