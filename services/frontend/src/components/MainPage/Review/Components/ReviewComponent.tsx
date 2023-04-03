/* eslint-disable no-console */
/* eslint-disable max-len */
import React, {useEffect} from 'react';
import {useMatches} from 'react-router';
import s from '../ReviewPage.module.scss';
import {Button, DirectoryField, Typography} from '../../../shared';
import {fieldType} from '@local/enums/shared';

const ReviewComponent = () => {
  const [{params: {reviewId}}] = useMatches();
  const _reviewId = Number(reviewId);

  // eslint-disable-next-line @typescript-eslint/no-empty-function, no-empty-function
  useEffect(() => {}, [reviewId]);

  return (
    <div className={s.reviewWrapper}>
      <div className={s.taskTitle}>
        <Typography variant={'body24'} weight={'bold'}>{'Очепятки'}</Typography>
      </div>
      <div className={s.taskWrapper}>
        <div className={s.notebox}>
          <Typography weight={'bold'}>{'Максимум 5 баллов'}</Typography>
          <Typography weight={'bold'}>{'Сдана 24 Февраля 2024 года'}</Typography>
        </div>
        <div className={s.description}>
          <Typography variant={'body14'}>{
            `Вася нашел крутое приложение на телефон. Можно фотографировать текст и преобразовывать фотографию в текстовый документ.

Вася тут же сфотографировал код с экрана своего одногруппника и с сожалением обнаружил, что результат не компилируется. По-видимому, некоторые символы распознались неверно.

Исправьте все ошибки так, чтобы код работал правильно.`
          }
          </Typography>
        </div>
      </div>
      <div className={s.answer}>
        <DirectoryField
          type={fieldType.TEXT_AREA}
          isDone={true}
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