/* eslint-disable @typescript-eslint/no-explicit-any */
import {makeAutoObservable} from 'mobx';

export class UserStore {
  user = {
    userId: null,
    roleId: [],
    accessToken: null
  };

  constructor() {
    makeAutoObservable(this, {
      auth: false
    }, {autoBind: true});
    this._init();
  }

  get userId() {
    return this.user.userId;
  }

  get userRoles() {
    return this.user.roleId;
  }

  _setUser = (user) => {
    this.user = user;
  };

  _init = async() => {
    const token = localStorage.getItem('access');

    if (token) {
      try {
        const userData = await window.api().path('/auth/check')
          .executePost();

        // eslint-disable-next-line no-console
        console.log(userData);

        if (userData) {
          this.logIn({
            userId: userData.id,
            roleId: userData.roleid,
            accessToken: userData.token
          });
        }

        return userData;
      } catch(_) {
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
      }
    }

    if (window.location.pathname === '/auth') {
      return;
    }

    window.location.pathname = '/auth';
  };

  logIn = ({userId, roleId, accessToken}) => {
    if (userId) {
      this._setUser({
        ...this.user,
        userId,
        roleId,
        accessToken
      });
    }
  };

  logOut = () => {
    this._setUser({
      ...this.user,
      userId: null,
      roleId: [],
      accessToken: null
    });
  };

  check = async() => {
    const result = await window
      .api()
      .path('/auth/check')
      .executePost();

    this._setUser({
      ...this.user,
      accessToken: result.accessToken
    });
  };

  auth = async(user) => {
    const res = await window.api().path('/auth/auth')
      .body(user)
      .executePost();

    return res;
  };

  registrateUser = async(user) => {
    await window.api().path('/auth/registration')
      .body(user)
      .executePost();

    return Promise.resolve();
  };
}