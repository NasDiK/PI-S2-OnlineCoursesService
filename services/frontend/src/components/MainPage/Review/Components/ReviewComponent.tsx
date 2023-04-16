/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {useEffect, useState} from 'react';
import {useMatches} from 'react-router';
import s from '../ReviewPage.module.scss';
import {Button, DirectoryField, Typography} from '../../../shared';
import {fieldType} from '@local/enums/shared';
import {useSelector} from 'react-redux';
import {dateConverter} from '../../../../utils';
import {dateFormat as dateFormatList} from '@local/enums/tools';
import {ReviewModel} from '../../../../stores/components/Review/ReviewModel';

const ReviewComponent = () => {
  const [{params: {id}}] = useMatches();
  const _reviewId = Number(id);
  const reviewList = useSelector((state: any) => state.reviewStore.reviewsList);
  const [curReview, setCurReview] = useState<ReviewModel>();

  useEffect(() => {
    const _review = reviewList.find(({log_id: reviewId}) => _reviewId === reviewId);

    setCurReview(new ReviewModel({..._review}));
  }, [_reviewId, reviewList]);

  return (
    <div className={s.reviewWrapper}>
      <div className={s.taskTitle}>
        <Typography variant={'body24'} weight={'bold'}>{curReview?.title}</Typography>
      </div>
      <div className={s.taskWrapper}>
        <div className={s.notebox}>
          {
            <Typography weight={'bold'}>
              {`${curReview?.maxNote && `Максимум ${curReview?.maxNote} баллов` || ''}`}
            </Typography>
          }
          <Typography weight={'bold'}>
            {
              `Сдано ${
                dateConverter
                  .dateConverter(
                    curReview?.logDate, dateFormatList.DATE_FROM_NOW_WITH_TIME
                  )
                  .toLocaleLowerCase()
              }`
            }
          </Typography>
        </div>
        <div className={s.description}>
          <Typography variant={'body14'}>{curReview?.description}</Typography>
        </div>
      </div>
      <div className={s.answer}>
        <DirectoryField
          type={fieldType.TEXT_AREA}
          isDone={true}
          value={curReview?.logValue}
        />
        <div className={s.buttons}>
          {
            curReview?.isPermittedToFail && (
              <Button
                backgroundColor={'#FF0F00'}
                onClick={curReview?.failReview}
              >{'Отклонить'}
              </Button>
            )
          }
          {
            curReview?.isPermittedToApprove && (
              <Button
                backgroundColor={'#13FF47'}
                onClick={curReview?.approveReview}
              >{'Принять'}
              </Button>
            )
          }
          {curReview?.textStatus && <Typography weight={'bold'}>{curReview.textStatus}</Typography>}
        </div>
      </div>
    </div>
  );
};

export default ReviewComponent;