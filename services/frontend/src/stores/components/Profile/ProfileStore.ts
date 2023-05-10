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
    return this.userInfo.roles?.map(({title}) => title) || [];
  }

  get targetUserId() {
    const linkUserId = parseInt(window.location.pathname.split('/')[2]);

    return linkUserId >= 0 ? linkUserId : this.userId;
    //Потому что 0 ид потенциально возможен. Если не указан или некорректный, то берём наш.
  }

  get isPermittedToDelete() {
    return this.targetUserId !== this.userId &&
      this.userStore.hasRole(roles.ADMIN);
  }

  get isPermittedToChangeName() {
    return this.targetUserId === this.userId ||
      this.userStore.hasRole(roles.ADMIN);
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

  changeName = async() => {
    const newName = prompt(this.userInfo.fullname || '');
    const oldName = this.userInfo.fullname || '';

    if (newName) {
      try {
        await window.api()
          .path('/users/setUserInfo')
          .body({
            targetUserId: this.targetUserId,
            fields: {
              fullname: newName
            }
          })
          .executePost();

        this.setUserInfo({
          ...this.userInfo,
          fullname: newName
        });

        window.notify({
          message: `Имя успешно изменено${oldName && ` с ${oldName}`} на ${newName}`,
          variant: 'success'
        });
      } catch(_) {
        console.log(_);
        window.notify({
          message: 'При изменении имени произошла ошибка',
          variant: 'error'
        });
      }

    }
  };

  changePassword = async() => {
    try {
      await window.api()
        .path('/users/setUserInfo')
        .body({
          targetUserId: this.targetUserId,
          fields: {
            password: this.password
          }
        })
        .executePost();

      window.notify({
        message: `Пароль успешно изменён`,
        variant: 'success'
      });
    } catch(_) {
      console.log(_);
      window.notify({
        message: 'При изменении пароля произошла ошибка',
        variant: 'error'
      });
    }
  };

  deleteUser = async() => {
    const {targetUserId} = this;

    if (!confirm('Действие не имеет возврата')) {
      return;
    }

    try {
      await window.api()
        .path('/users/deleteUserById')
        .body({
          targetUserId
        })
        .executePost();

      window.notify({
        message: 'Пользователь успешно удалён',
        variant: 'success'
      });

      window.location.pathname = '/profile/my';
    } catch(_) {
      console.log(_);
      window.notify({
        message: 'Произошла ошибка при удалении пользователя',
        variant: 'error'
      });
    }
  };
}