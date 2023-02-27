import React from 'react';
import '../components/AuthPage/AuthPageView.scss';
import Typography from '../components/shared/Basic/Typography/Typography';
import DirectoryField from '../components/shared/Basic/DirectoryField/DirectoryField';
import Button from '../components/shared/Basic/Button/Button';

const AuthPage = () => (
  <div className='auth-page'>
    <div className={'auth-form'}>
      <div className={'form-top'}>
        <div className={'form-top-image'}>{}</div>
        <div className={'form-top-text'}>
          <Typography variant={'body32'}>{'Школозавр.net'}</Typography>
        </div>
      </div>
      <div className={'form-bot'}>
        <div className={'login-group'}>
          <div className={'login-logo'}>
            <Typography variant={'body14'}>{'Логин'}</Typography>
          </div>
          <div className={'login-field'}>
            <DirectoryField
              fullwidth={true}
              type={2}
              placeholder={'Плейсхолдер...'}
              size={'small'}
            />
          </div>
        </div>
        <div className={'password-group'}>
          <div className={'login-logo'}>
            <Typography variant={'body14'}>{'Пароль'}</Typography>
          </div>
          <div className={'login-field'}>
            <DirectoryField
              fullwidth={true}
              type={2}
              placeholder={'Плейсхолдер...'}
              size={'small'}
            />
          </div>
        </div>
        <div className={'button'}>
          <Button variant={'primary'}>{'Войти'}</Button>
        </div>
      </div>
    </div>
  </div>
);

export default AuthPage;