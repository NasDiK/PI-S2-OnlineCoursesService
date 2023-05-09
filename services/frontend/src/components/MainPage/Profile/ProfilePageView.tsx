import React from 'react';
import s from './ProfilePage.module.scss';
import PropTypes from 'prop-types';
import {magic} from '../../../mobxUtils';
import {Button, Tabs, Typography} from '../../shared';
import GroupsTab from './Tabs/GroupsTab';
import RolesTab from './Tabs/RolesTab';

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

const renderUserContent = ({user, activeTab, setActiveTab, tabs}) => (
  <React.Fragment>
    <div className={s.personalInfo}>
      <div>
        <Typography weight={'medium'}>{'Идентификатор: '}</Typography>
        <Typography>{user.id}</Typography>
      </div>
      <div>
        <Typography weight={'medium'}>{'Полное имя: '}</Typography>
        <Typography>{user.fullname}</Typography>
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

const ProfilePageView = ({user, activeTab, setActiveTab, tabs}) => {
  const _t = 1;

  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        <div className={s.header}>
          <Typography weight={'bold'}>{'Профиль пользователя'}</Typography>
        </div>
        <div className={s.userContent}>
          {
            user ? renderUserContent({user, activeTab, setActiveTab, tabs}) :
              <Typography>{'Пользователь не найден'}</Typography>
          }
        </div>
      </div>
    </div>
  );
};

const mapStore = ({ProfileStore}) => {
  return {
    user: ProfileStore.userInfo,
    setActiveTab: ProfileStore.setActiveTab,
    activeTab: ProfileStore.activeTab,
    tabs: ProfileStore.tabs
  };
};

ProfilePageView.propTypes = {
  user: PropTypes.object,
  setActiveTab: PropTypes.func,
  activeTab: PropTypes.number,
  tabs: PropTypes.array
};

export default magic(ProfilePageView, {store: mapStore});