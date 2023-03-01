import React from 'react';
import s from './MainPage.module.scss';
import logo from '../AuthPage/assets/cat.png';
import {Button, Typography} from '../shared';

const Header = () => (
  <div className={s.headerWrapper}>
    <div className={s.logoWrapper}>
      <img src={logo} className={s.logo} />
      <Typography variant={'body20'} weight={'bold'}>{'Школозавр.net'}</Typography>
    </div>
    <div className={s.buttons}>
      {true && <Button variant={'thin'}><Typography>{'Админ-панель'}</Typography></Button>}
      {true && <Button variant={'thin'}><Typography>{'Код-ревью'}</Typography></Button>}
      {true && <Button variant={'thin'}><Typography>{'Мои студенты'}</Typography></Button>}
      {true && <Button variant={'thin'}><Typography>{'Мои курсы'}</Typography></Button>}
      {true && <Button variant={'thin'}><Typography>{'Рейтинг'}</Typography></Button>}
      {true && <Button variant={'thin'}><Typography>{'Выйти'}</Typography></Button>}
    </div>
  </div>
);

export default Header;