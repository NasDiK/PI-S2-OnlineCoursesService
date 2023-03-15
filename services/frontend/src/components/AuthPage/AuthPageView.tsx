import React, {useEffect} from 'react';
import s from './AuthPageView.module.scss';
import Typography from '../shared/Basic/Typography/Typography';
import DirectoryField from '../shared/Basic/DirectoryField/DirectoryField';
import Button from '../shared/Basic/Button/Button';
import {useNavigate} from 'react-router';
import {useDispatch, useSelector} from 'react-redux';
import {logIn as loginFunc} from '../../stores/core/UserStoreReducer';

interface iState {
  userStore: {
    logged: boolean
  }
}

const AuthPageView = () => {
  const navigate = useNavigate();
  const logged = useSelector((state: iState) => state.userStore.logged);
  const dispatch = useDispatch();
  let login;
  let password;

  const onChangeLogin = (val) => {
    // eslint-disable-next-line no-console
    console.log(val);
    login = val;
  };

  const onChangePass = (val) => {
    // eslint-disable-next-line no-console
    console.log(val);
    password = val;
  };

  useEffect(() => {
    if (logged) {
      navigate('/');
    }
  }, [logged]);

  const fetchUser = async() => {
    const user = {
      username: login,
      password
    };
    const res = await fetch('http://localhost:3001/auth/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(user)
    });
    const result = await res.json();

    // eslint-disable-next-line no-console
    console.log(result.message());
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
            {/*<Button variant={'primary'} onClick={()=>dispatch(loginFunc())}>{'Войти'}</Button>*/}
            <Button variant={'primary'} onClick={() => fetchUser()}>{'Войти'}</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPageView;