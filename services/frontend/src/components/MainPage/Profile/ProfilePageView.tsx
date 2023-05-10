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

const renderUserContent = ({user, activeTab, setActiveTab, tabs, changeName}) => (
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
            true && (
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
          <Typography>{'Смена пароля'}</Typography>
          <DirectoryField
            type={fieldType.TEXT}
            fullWidth={true}
            placeholder={'Введите пароль...'}
          />
          <DirectoryField
            type={fieldType.TEXT}
            fullWidth={true}
            placeholder={'Повторите пароль...'}
          />
          <Button fullWidth={true}>{'Изменить пароль'}</Button>
        </div>
      </div>
      <div className={s.controls}>
        {<Button backgroundColor={'red'}>{'Удалить пользователя'}</Button>}
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

const ProfilePageView = ({user, activeTab, setActiveTab, tabs, changeName}) => (
  <div className={s.wrapper}>
    <div className={s.container}>
      <div className={s.header}>
        <Typography weight={'bold'}>{'Профиль пользователя'}</Typography>
      </div>
      <div className={s.userContent}>
        {
          user ? renderUserContent({user, activeTab, setActiveTab, tabs, changeName}) :
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
    changeName: ProfileStore.changeName
  };
};

ProfilePageView.propTypes = {
  user: PropTypes.object,
  setActiveTab: PropTypes.func,
  activeTab: PropTypes.number,
  tabs: PropTypes.array,
  changeName: PropTypes.func
};

export default magic(ProfilePageView, {store: mapStore});