import React, {useEffect} from 'react';
import s from './AuthPageView.module.scss';
import Typography from '../shared/Basic/Typography/Typography';
import DirectoryField from '../shared/Basic/DirectoryField/DirectoryField';
import Button from '../shared/Basic/Button/Button';
import {useNavigate} from 'react-router';
import {useDispatch, useSelector} from 'react-redux';
import {logIn as loginFunc} from '../../stores/core/UserStoreReducer';

interface iState {
  toolkit: {
    logged: boolean
  }
}

const AuthPageView = () => {
  const navigate = useNavigate();
  const logged = useSelector((state: iState) => state.toolkit.logged);
  const dispatch = useDispatch();

  useEffect(() => {
    if (logged) {
      navigate('/');
    }
  }, [logged]);

  return (
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
            <Button variant={'primary'} onClick={() => dispatch(loginFunc())}>{'Войти'}</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPageView;