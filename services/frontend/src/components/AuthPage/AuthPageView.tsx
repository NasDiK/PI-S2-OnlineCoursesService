import React, {useEffect} from 'react';
import s from './AuthPageView.module.scss';
import Typography from '../shared/Basic/Typography/Typography';
import DirectoryField from '../shared/Basic/DirectoryField/DirectoryField';
import Button from '../shared/Basic/Button/Button';
import {useNavigate} from 'react-router';
import {useDispatch, useSelector} from 'react-redux';
import {logIn as loginFunc, AuthState} from '../../stores/core/UserStoreReducer';

const AuthPageView = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state: AuthState) => state.userData);
  const logged = useSelector((state: AuthState) => state.userData);
  let login;
  let password;

  const onChangeLogin = (val) => {
    login = val;
  };

  const onChangePass = (val) => {
    password = val;
  };

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token]);

  const authorization = async(user) => {
    const res = await fetch('http://localhost:3001/auth/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(user)
    });
    const payload = await res;

    return payload.json();
  };

  const fetchUser = async() => {
    const user = {
      username: login,
      password
    };
    let payload;

    payload = await authorization(user);

    if (!payload.userId) {
      await fetch('http://localhost:3001/auth/registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(user)
      });
      payload = await authorization(user);
    }

    dispatch(loginFunc({payload}));
    // eslint-disable-next-line no-console
    console.log(`token: ${token}`);
    // eslint-disable-next-line no-console
    console.log(`logged: ${logged}`);
  };

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
                placeholder={'Логин...'}
                size={'small'}
                fullWidth={true}
                onChange={onChangeLogin}
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
                onChange={onChangePass}
              />
            </div>
          </div>
          <div className={s.button}>
            <Button
              variant={'primary'}
              onClick={
                () => fetchUser()
              }
            >{'Войти'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPageView;