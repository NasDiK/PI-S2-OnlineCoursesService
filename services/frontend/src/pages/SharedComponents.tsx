/* eslint-disable max-len */
import React from 'react';
import {DirectoryField, Typography, Button, Alert} from '../components/shared';
import {AlertTitle, CircularProgress, LinearProgress} from '@mui/material';
import s from './styles.module.scss';

const SynchLabel = '(SYNCH - будет изменена)';
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
      <h2>{`Инпут (DirectoryField) `}</h2>
      <div>
        <h3>{`type: 1 (select) ${InWorkLabel}`}</h3>
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
      <h2>{`Кнопка (Button) `}</h2>
      <div>
        <h3>{`primary (default) ${SynchLabel}`}</h3>
        <Button variant={'primary'}>{'test'}</Button>
        <Button variant={'primary'} padding={'25px 25px'}>
          <Typography weight={'bold'} variant={'body24'}>{'test2'}</Typography>
        </Button>
      </div>
      <div>
        <h3>{`thin ${SynchLabel}`}</h3>
        <Button variant={'thin'} size={'small'}>{'test'}</Button>
        <Button variant={'thin'} size={'normal'}>{'test2'}</Button>
        <Button variant={'thin'} size={'normal'}>
          <Typography weight={'bold'} variant={'body24'}>{'test2'}</Typography>
        </Button>
      </div>
      <div>
        <h3>{'roundThin'}</h3>
        <Button variant={'roundThin'} size={'small'}>{'test'}</Button>
        <Button variant={'roundThin'} size={'normal'}>{'test2'}</Button>
        <Button variant={'roundThin'} size={'normal'}>
          <Typography weight={'bold'} variant={'body24'}>{'test2'}</Typography>
        </Button>
      </div>
      <p>
        <i>
          {'Предпочтительнее конечно в кнопку прокидывать только SIZE и текст через {}, без типографии'}
        </i>
      </p>
    </div>

    <div className={s.alert}>
      <h2>{`Алерты`}</h2>
      <Alert variant={'error'}>{'Тест тестович тестов | variant={\'error\'}'}</Alert>
      <Alert variant={'info'}>{'Тест тестович тестов | variant={\'info\'}'}</Alert>
      <Alert variant={'success'}>{'Тест тестович тестов | variant={\'success\'}'}</Alert>
      <Alert variant={'warning'}>{'Тест тестович тестов | variant={\'warning\'}'}</Alert>
      <h3>{'props: width -> number | \'fit-content\''}</h3>
      <div className={s.flex}>
        <Alert variant={'success'} width={300}>{'Тестовые лейбл чо поделат'}</Alert>
        <h4>{'width = 300'}</h4>
      </div>
      <div className={s.flex}>
        <Alert variant={'success'} width={'fit-content'}>{'Тестовые лейбл чо поделат'}</Alert>
        <h4>{'width = \'fit-content\''}</h4>
      </div>
      <p>{'Также им можно прокидывать дескрипшн (Нужно в children AlertTitle передавать (из @mui/material))'}</p>
      <Alert variant={'success'} width={'fit-content'}>{
        <React.Fragment>
          <AlertTitle>
            <Typography weight={'bold'}>{'Пророк брошюра крекер крен'}</Typography>
          </AlertTitle>
          {'Ипсем лорам'}
        </React.Fragment>
      }
      </Alert>
      <p>{'withClose пропса'}</p>
      <Alert variant={'success'} width={'fit-content'} withClose={true}>{'Говно залупа пенис хер'}</Alert>
      <p>{'debounceTime (в милисекундах) пропса 3000'}</p>
      <Alert variant={'success'} width={'fit-content'} debounceTime={3000}>{'Говно залупа пенис хер'}</Alert>
    </div>

    <div>
      <h2>{`Функция нотифая ${InWorkLabel}`}</h2>
      <Button variant={'roundThin'} size={'normal'}>{'Клик'}</Button>
      <p>{'Использование в коде: '}</p>
      <pre>
        {
          `
          notify({
            variant: 'success',
            message: 'Беда'
          });`
        }
      </pre>
    </div>

  </div>
);

export default SharedPage;