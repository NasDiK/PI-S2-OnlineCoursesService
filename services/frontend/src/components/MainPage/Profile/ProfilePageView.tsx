import React from 'react';
import s from './ProfilePage.module.scss';
import PropTypes from 'prop-types';
import {magic} from '../../../mobxUtils';
import {Button, DirectoryField, Tabs, Typography} from '../../shared';
import GroupsTab from './Tabs/GroupsTab';
import RolesTab from './Tabs/RolesTab';
import {fieldType} from '@local/enums/shared';
import EditIcon from '@mui/icons-material/Edit';

const renderTab = (tab) => {
  switch (tab) {
    case 1: //Группы
      return <GroupsTab />;
    case 2: //Роли
      return <RolesTab />;
    default:
      return <Typography>{'Выберите таб'}</Typography>;
  }
};

const renderUserContent = ({
  user, activeTab, setActiveTab, tabs, changeName,
  password, setPassword, passwordConfirm, setConfirmPassword,
  changePassword, isPermittedToDelete, deleteUser, isPermittedToChangeName
}) => (
  <React.Fragment>
    <div className={s.personalInfo}>
      <div>
        <div>
          <Typography weight={'medium'}>{'Идентификатор: '}</Typography>
          <Typography>{user.id}</Typography>
        </div>
        <div>
          <Typography weight={'medium'}>{'Полное имя: '}</Typography>
          <Typography>{user.fullname}</Typography>
          {
            isPermittedToChangeName && (
              <Button variant={'icon'} onClick={changeName}>
                <EditIcon sx={
                  {
                    width: 16,
                    height: 16
                  }
                }
                />
              </Button>
            )
          }
        </div>
        <div>
          <hr />
          <Typography>{'Смена пароля'}</Typography><hr />
          {password !== passwordConfirm && <Typography>{'Пароли не совпадают'}</Typography>}
          <DirectoryField
            type={fieldType.TEXT}
            fullWidth={true}
            placeholder={'Введите пароль...'}
            name={'password_input'}
            value={password}
            onChange={setPassword}
          />
          <DirectoryField
            type={fieldType.TEXT}
            fullWidth={true}
            name={'password_confirm'}
            placeholder={'Повторите пароль...'}
            value={passwordConfirm}
            onChange={setConfirmPassword}
          />
          <Button
            fullWidth={true}
            disabled={password !== passwordConfirm}
            onClick={changePassword}
          >
            {'Изменить пароль'}
          </Button>
        </div>
      </div>
      <div className={s.controls}>
        {
          isPermittedToDelete &&
            <Button backgroundColor={'red'} onClick={deleteUser}>{'Удалить пользователя'}</Button>
        }
      </div>
    </div>
    <div className={s.groups}>
      <Tabs
        tabs={tabs}
        value={activeTab}
        onChange={setActiveTab}
      />
      {renderTab(activeTab)}
    </div>
  </React.Fragment>
);

const ProfilePageView = ({
  user, activeTab, setActiveTab, tabs, changeName,
  password, setPassword, passwordConfirm, setConfirmPassword,
  changePassword, isPermittedToDelete, deleteUser, isPermittedToChangeName
}) => (
  <div className={s.wrapper}>
    <div className={s.container}>
      <div className={s.header}>
        <Typography weight={'bold'}>{'Профиль пользователя'}</Typography>
      </div>
      <div className={s.userContent}>
        {
          user ? renderUserContent({
            user,
            activeTab,
            setActiveTab,
            tabs,
            changeName,
            password,
            setPassword,
            passwordConfirm,
            setConfirmPassword,
            changePassword,
            isPermittedToDelete,
            deleteUser,
            isPermittedToChangeName
          }) :
            <Typography>{'Пользователь не найден'}</Typography>
        }
      </div>
    </div>
  </div>
);

const mapStore = ({ProfileStore}) => {
  return {
    user: ProfileStore.userInfo,
    setActiveTab: ProfileStore.setActiveTab,
    activeTab: ProfileStore.activeTab,
    tabs: ProfileStore.tabs,
    changeName: ProfileStore.changeName,
    password: ProfileStore.password,
    setPassword: ProfileStore.setPassword,
    passwordConfirm: ProfileStore.passwordConfirm,
    setConfirmPassword: ProfileStore.setConfirmPassword,
    changePassword: ProfileStore.changePassword,
    isPermittedToDelete: ProfileStore.isPermittedToDelete,
    deleteUser: ProfileStore.deleteUser,
    isPermittedToChangeName: ProfileStore.isPermittedToChangeName
  };
};

ProfilePageView.propTypes = {
  user: PropTypes.object,
  setActiveTab: PropTypes.func,
  activeTab: PropTypes.number,
  tabs: PropTypes.array,
  changeName: PropTypes.func,
  password: PropTypes.string,
  setPassword: PropTypes.func,
  passwordConfirm: PropTypes.string,
  setConfirmPassword: PropTypes.func,
  changePassword: PropTypes.func,
  isPermittedToDelete: PropTypes.bool,
  isPermittedToChangeName: PropTypes.bool,
  deleteUser: PropTypes.func
};

export default magic(ProfilePageView, {store: mapStore});