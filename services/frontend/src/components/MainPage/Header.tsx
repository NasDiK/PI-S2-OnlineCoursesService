import React from 'react';
import s from './MainPage.module.scss';
import logo from '../AuthPage/assets/cat.png';
import {Button, Typography} from '../shared';
import {useNavigate} from 'react-router';
import {magic} from '../../mobxUtils';
import PropTypes from 'prop-types';
import {roles} from '@local/enums/roles';

const Header = ({UserStore: {logOut, hasRole}}) => {
  const navigate = useNavigate();

  const executeLogOut = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    logOut();
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
          hasRole(roles.ADMIN) && (
            <Button variant={'thin'} onClick={() => navigate('/admin-panel')}>
              <Typography>{'Админ-панель'}</Typography>
            </Button>
          )
        }
        {
          hasRole(roles.ADMIN, roles.TEACHER) && (
            <Button variant={'thin'} onClick={() => navigate('/review')}>
              <Typography>{'Код-ревью'}</Typography>
            </Button>
          )
        }
        {
          hasRole(roles.ADMIN, roles.TEACHER) && (
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
            <Button variant={'thin'} onClick={() => navigate('/profile/my')}>
              <Typography>{'Профиль'}</Typography>
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

Header.propTypes = {
  UserStore: PropTypes.object
};

export default magic(Header, {store: 'UserStore'});