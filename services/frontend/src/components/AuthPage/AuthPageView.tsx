import React from 'react';
import s from './AuthPageView.module.scss';
import Typography from '../shared/Basic/Typography/Typography';
import DirectoryField from '../shared/Basic/DirectoryField/DirectoryField';
import Button from '../shared/Basic/Button/Button';

const AuthPageView = () => (
  <div className={s.authPage}>
    <div className={s.form}>
      <div className={s.top}>
        <div className={s.image}>{}</div>
        <div className={s.text}>
          <Typography variant={'body32'}>{'Школозавр.net'}</Typography>
        </div>
      </div>
      <div className={s.bot}>
        <div className={s.login}>
          <Typography variant={'body14'} weight={'medium'}>{'Логин'}</Typography>
          <div className={s.field}>
            <DirectoryField
              fullwidth={true}
              type={2}
              placeholder={'Плейсхолдер...'}
              size={'small'}
              fullWidth={true}
            />
          </div>
        </div>
        <div className={s.password}>
          <Typography variant={'body14'} weight={'medium'}>{'Пароль'}</Typography>
          <div className={s.field}>
            <DirectoryField
              fullwidth={true}
              type={2}
              placeholder={'Плейсхолдер...'}
              size={'small'}
              fullWidth={true}
            />
          </div>
        </div>
        <div className={s.button}>
          <Button variant={'primary'}>{'Войти'}</Button>
        </div>
      </div>
    </div>
  </div>
);

export default AuthPageView;