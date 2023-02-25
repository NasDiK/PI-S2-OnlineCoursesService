import React from 'react';
import {DirectoryField, Typography, Button} from '../components/shared';
import {CircularProgress, LinearProgress} from '@mui/material';
import s from './styles.module.scss';

const SynchLabel = '(SYNCH - будет вынесен в компоненту, пока для глазиков пристрелка)';
const InWorkLabel = '(InWork - нельзя использовать пока-что)';

const SharedPage = () => (
  <div className={s.sharedPage}>
    <div>
      <h2>{'Типография (текст)'}</h2>
      <div><Typography variant={'body20'} weight={'regular'}>{'Test'}</Typography></div>
    </div>
    <div className={s.loader}>
      <h2>{`Лоадер ${SynchLabel}`}</h2>
      <div className={s.container}>
        <div><CircularProgress size={32} thickness={7} /></div>
        <div><LinearProgress sx={{width: 250}} /></div>
      </div>
    </div>
    <div>
      <h2>{`Инпут (DirectoryField) ${InWorkLabel}`}</h2>
      <div>
        <h3>{'type: 1 (select)'}</h3>
        <p>{`Вариант normal. size->['small','medium']`}</p>
        <DirectoryField type={1} size={'small'} />&nbsp;&nbsp;&nbsp;
        <DirectoryField type={1} size={'medium'} />&nbsp;&nbsp;&nbsp;
        <p>{`Вариант outline. size->['small','medium']`}</p>
        <DirectoryField type={1} size={'small'} variant={'outline'} />&nbsp;&nbsp;&nbsp;
        <DirectoryField type={1} size={'medium'} variant={'outline'} />&nbsp;&nbsp;&nbsp;
      </div>
      <div>
        <h3>{'type: 2 (text)'}</h3>
        <DirectoryField type={2} placeholder={'Плейсхолдер...'} size={'small'} />&nbsp;&nbsp;&nbsp;
        <DirectoryField type={2} placeholder={'Плейсхолдер...'} size={'medium'} />
      </div>
    </div>
    <div>
      <h2>{`Кнопка (Button) ${InWorkLabel}`}</h2>
      <Button variant={'primary'}>{'test'}</Button>
      <Button variant={'primary'} padding={'25px 25px'}>
        <Typography weight={'bold'} variant={'body24'}>{'test2'}</Typography>
      </Button>
    </div>
  </div>
);

export default SharedPage;