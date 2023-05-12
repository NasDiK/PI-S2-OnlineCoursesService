/* eslint-disable react/prop-types */
import React, {useState} from 'react';
import s from './AuthPageView.module.scss';
import Typography from '../shared/Basic/Typography/Typography';
import DirectoryField from '../shared/Basic/DirectoryField/DirectoryField';
import Button from '../shared/Basic/Button/Button';
import {useNavigate} from 'react-router';
import {magic} from '../../mobxUtils';
import {fieldType} from '@local/enums/shared';

const AuthPageView = ({logIn, auth: authorization, registrateUser}) => {
  const navigate = useNavigate();

  const [loginField, setLoginField] = useState<string>('');
  const [passwordField, setPasswordField] = useState<string>('');

  const fetchUser = async() => {
    const user = {
      username: loginField,
      password: passwordField
    };

    let payload = await authorization(user);

    if (payload.message === `Пользователь ${user.username} не найден`) {
      await registrateUser(user);

      payload = await authorization(user);
    }

    try {
      if (payload.tokens.accessToken) {
        localStorage.setItem('access', payload.tokens.accessToken);
        localStorage.setItem('refresh', payload.tokens.refreshToken);
      }

      await logIn(payload);

      if (payload.userId) {
        navigate('/');
      }
    } catch(_) {
      window.notify({
        message: payload.message,
        variant: 'error'
      });
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
                type={fieldType.TEXT}
                placeholder={'Логин...'}
                size={'small'}
                fullWidth={true}
                onChange={setLoginField}
                name={'login_auth'}
                value={loginField}
              />
            </div>
          </div>
          <div className={s.password}>
            <Typography variant={'body14'} weight={'medium'}>{'Пароль'}</Typography>
            <div className={s.field}>
              <DirectoryField
                type={fieldType.TEXT}
                placeholder={'Пароль...'}
                size={'small'}
                fullWidth={true}
                onChange={setPasswordField}
                name={'password_auth'}
                value={passwordField}
              />
            </div>
          </div>
          <div className={s.button}>
            <Button
              variant={'primary'}
              onClick={fetchUser}
            >{'Войти'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStore = ({UserStore}) => {
  return {
    logIn: UserStore.logIn,
    auth: UserStore.auth,
    registrateUser: UserStore.registrateUser
  };
};

export default magic(AuthPageView, {store: mapStore});