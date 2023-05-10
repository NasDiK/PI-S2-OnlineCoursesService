/* eslint-disable camelcase */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {makeAutoObservable} from 'mobx';
import {UserStore as UserStoreType} from '../../core/UserStore';
import {roles} from '@local/enums/roles';

export class ProfileStore {
  tabs = [
    {
      'value': 1,
      label: 'Группы пользователя'
    },
    {
      'value': 2,
      label: 'Роли пользователя'
    }
  ];

  userStore: UserStoreType;
  userInfo: any = {
    id: -5,
    fullname: 'Симонов Иван Татьянович',
    roles: [
      {
        id: 42,
        title: 'Студент',
        name: 'student'
      }
    ],
    groups: [
      {
        group_id: 4,
        isModerator: false,
        groupInfo: {
          id: 1,
          course_id: 40,
          title: 'Моковая #1'
        }
      }
    ]
  };

  password;
  passwordConfirm;

  activeTab: number | undefined;

  constructor({UserStore}) {
    makeAutoObservable(this, {
      tabs: false
    }, {autoBind: true});

    this.userStore = UserStore;
    this._init();
  }

  get userId() {
    return this.userStore.userId;
  }

  get userRoles() {
    return this.userInfo.roles.map(({title}) => title);
  }

  get targetUserId() {
    const linkUserId = parseInt(window.location.pathname.split('/')[2]);

    return linkUserId >= 0 ? linkUserId : this.userId;
    //Потому что 0 ид потенциально возможен. Если не указан или некорректный, то берём наш.
  }

  _init = () => {
    this.searchUserInfo();
  };

  setActiveTab = (tab) => {
    this.activeTab = tab;
  };

  setPassword = (p) => {
    this.password = p;
  };

  setConfirmPassword = (cp) => {
    this.passwordConfirm = cp;
  };

  setUserInfo = (ui) => {
    this.userInfo = ui;
  };

  searchUserInfo = async() => {
    const [userInfo] = await window.api()
      .path('/users/searchUsers')
      .body({
        usersIds: [this.targetUserId],
        appends: ['groups', 'roles']
      })
      .executePost();

    this.setUserInfo(userInfo);
  };

  changeName = () => {
    const newName = prompt(this.userInfo.fullname || '');

    if (newName) {
      console.log(`Сменить имя на ${newName}`);
    }
  };
}