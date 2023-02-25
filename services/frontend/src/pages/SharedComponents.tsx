import React from 'react';
import {Typography} from '../components/shared';
import {Select, MenuItem, CircularProgress} from '@mui/material';
import s from './styles.module.scss';

const MenuItemsForSelect = [
  <MenuItem value={10} key={1}>{'Ten'}</MenuItem>,
  <MenuItem value={20} key={2}>{'Twenty'}</MenuItem>,
  <MenuItem value={30} key={3}>{'Thirty'}</MenuItem>
];

const SharedPage = () => (
  <div className={s.sharedPage}>
    <div>
      <h2>{'Типография (текст)'}</h2>
      <div><Typography variant={'body20'} weight={'regular'}>{'Test'}</Typography></div>
    </div>
    <div className={s.select}>
      <h2>{'Селект'}</h2>
      <Select multiple={false} variant={'standard'} size={'small'}>
        {MenuItemsForSelect}
      </Select>&nbsp;&nbsp;&nbsp;
      <Select multiple={false} variant={'standard'} size={'medium'}>
        {MenuItemsForSelect}
      </Select><br />
      <Select multiple={false} variant={'outlined'} size={'small'}>
        {MenuItemsForSelect}
      </Select>&nbsp;&nbsp;&nbsp;
      <Select multiple={false} variant={'outlined'} size={'medium'}>
        {MenuItemsForSelect}
      </Select><br />
      <Select multiple={false} variant={'filled'} size={'small'}>
        {MenuItemsForSelect}
      </Select>&nbsp;&nbsp;&nbsp;
      <Select multiple={false} variant={'filled'} size={'medium'}>
        {MenuItemsForSelect}
      </Select><br />
    </div>
    <div className={s.loader}>
      <h2>{'Лоадер (SYNCH - будет вынесен в компоненту, пока для глазиков пристрелка)'}</h2>
      <CircularProgress size={32} thickness={7} />
    </div>
  </div>
);

export default SharedPage;