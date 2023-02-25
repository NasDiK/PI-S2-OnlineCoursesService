import React from 'react';
import {Button, Typography} from '../components/shared';
import {Select, MenuItem} from '@mui/material';
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
      <Select multiple={false} variant={'standard'}>
        {MenuItemsForSelect}
      </Select><br />
      <Select multiple={false} variant={'outlined'}>
        {MenuItemsForSelect}

      </Select><br />
      <Select multiple={false} variant={'filled'}>
        {MenuItemsForSelect}
      </Select><br />
    </div>
  </div>
);

export default SharedPage;