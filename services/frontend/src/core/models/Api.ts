import {API_PORT} from '@local/documentation';

class Api {
  private _paramsInfo; //nullable->object
  private _bodyInfo; //nullable->object
  private _pathName;

  //TODO Добавить мету пользователя

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
    // credentials: 'include',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      ...this._paramsInfo
    }
  }).then((x) => x.json());

  executePost = () => fetch(`http://localhost:${API_PORT}${this._pathName}`, {
    method: 'POST',
    body: JSON.stringify(this._bodyInfo),
    // credentials: 'include',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      ...this._paramsInfo
    }
  }).then((x) => x.json());
}

export default Api;