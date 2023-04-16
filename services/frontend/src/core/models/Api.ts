import {API_PORT} from '@local/documentation';

class Api {
  private _paramsInfo; //nullable->object
  private _bodyInfo; //nullable->object
  private _pathName;

  get accessToken() {
    return localStorage.getItem('access');
  }

  get refreshToken() {
    return localStorage.getItem('refresh');
  }

  path = (name) => {
    this._pathName = name;

    return this;
  };

  params = (param) => {
    this._paramsInfo = param;

    return this;
  };

  body = (body) => {
    this._bodyInfo = body;

    return this;
  };

  executeGet = () => fetch(`http://localhost:${API_PORT}${this._pathName}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      token: this.accessToken,
      refreshToken: this.refreshToken,
      ...this._paramsInfo
    }
  }).then((x) => {
    try {
      const _newAT = x.headers.get('x-auth-token');

      _newAT && localStorage.setItem('access', _newAT);
      const xJson = x.json();

      return xJson;
    } catch(err) {
      return x;
    }
  });

  executePost = () => fetch(`http://localhost:${API_PORT}${this._pathName}`, {
    method: 'POST',
    body: JSON.stringify(this._bodyInfo),
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      token: this.accessToken,
      refreshToken: this.refreshToken,
      ...this._paramsInfo
    }
  }).then((x) => {
    try {
      const _newAT = x.headers.get('x-auth-token');

      _newAT && localStorage.setItem('access', _newAT);
      const xJson = x.json();

      return xJson;
    } catch(err) {
      return x;
    }
  });
}

export default Api;