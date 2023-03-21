import React from 'react';
import s from './MainPage.module.scss';
import logo from '../AuthPage/assets/cat.png';
import {Button, Typography} from '../shared';
import {useNavigate} from 'react-router';
import {useDispatch} from 'react-redux';
import {logOut as logoutFunc} from '../../stores/core/UserStoreReducer';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const executeLogOut = async() => {
    await window.api().path('/auth/logout')
      .executePost();

    localStorage.removeItem('access');
    dispatch(logoutFunc());
    navigate('/auth');
  };

  return (
    <div className={s.headerWrapper}>
      <div className={s.logoWrapper}>
        <img src={logo} className={s.logo} onClick={() => navigate('/shared')} />
        <Typography variant={'body20'} weight={'bold'}>{'Школозавр.net'}</Typography>
      </div>
      <div className={s.buttons}>
        {
          true && (
            <Button variant={'thin'} onClick={() => navigate('/admin-panel')}>
              <Typography>{'Админ-панель'}</Typography>
            </Button>
          )
        }
        {
          true && (
            <Button variant={'thin'} onClick={() => navigate('/review')}>
              <Typography>{'Код-ревью'}</Typography>
            </Button>
          )
        }
        {
          true && (
            <Button variant={'thin'} onClick={() => navigate('/students')}>
              <Typography>{'Мои студенты'}</Typography>
            </Button>
          )
        }
        {
          true && (
            <Button variant={'thin'} onClick={() => navigate('/courses')}>
              <Typography>{'Мои курсы'}</Typography>
            </Button>
          )
        }
        {
          true && (
            <Button variant={'thin'} onClick={() => navigate('/rating')}>
              <Typography>{'Рейтинг'}</Typography>
            </Button>
          )
        }
        {
          true && (
            <Button variant={'thin'} onClick={executeLogOut}>
              <Typography>{'Выйти'}</Typography>
            </Button>
          )
        }
      </div>
    </div>
  );
};

export default Header;