import React, {useEffect} from 'react';
import s from './AuthPageView.module.scss';
import Typography from '../shared/Basic/Typography/Typography';
import DirectoryField from '../shared/Basic/DirectoryField/DirectoryField';
import Button from '../shared/Basic/Button/Button';
import {useNavigate} from 'react-router';
import {useDispatch} from 'react-redux';
import {logIn as loginFunc} from '../../stores/core/UserStoreReducer';

export const tryAuth = (dispatch, navigate, token) => {
  const userData = window.api().path('/auth/check')
    .body({token})
    .executePost();

  userData.then((_data) => {
    if (_data) {
      const {userData: ud} = _data;

      // eslint-disable-next-line no-console
      console.log(ud);

      dispatch(loginFunc({payload: {userId: ud.id.id,
        roleId: ud.roleId,
        accessToken: token}}));
    }
    navigate('/');
  });

  return userData;
};
const AuthPageView = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem('access');
  let login;
  let password;

  useEffect(() => {
    if (token) {
      tryAuth(dispatch, navigate, token);
    }

  }, []);

  const onChangeLogin = (val) => {
    login = val;
  };

  const onChangePass = (val) => {
    password = val;
  };

  const authorization = async(user) => {
    const res = await window.api().path('/auth/auth')
      .body(user)
      .executePost();

    return res;
  };
  const fetchUser = async() => {
    const user = {
      username: login,
      password
    };
    let payload;

    payload = await authorization(user);

    if (!payload.userId) {
      const res = await window.api().path('/auth/registration')
        .body(user)
        .executePost();

      payload = await authorization(user);
    }

    localStorage.setItem('access', payload.accessToken);
    dispatch(loginFunc({payload}));

    if (payload.userId) {
      navigate('/');
    }
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