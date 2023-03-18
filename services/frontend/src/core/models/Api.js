import {API_PORT} from '@local/documentation';

class Api {
  serviceName; //nullable->object
  paramsInfo; //nullable->object
  bodyInfo; //nullable->object

  //TODO Добавить мету пользователя

  path = (name) => {
    this.pathName = name;

    return this;
  };

  params = (param) => {
    this.paramsInfo = param;

    return this;
  };

  body = (body) => {
    this.bodyInfo = body;

    return this;
  };

  executeGet = () => fetch(`http://localhost:${API_PORT}${this.pathName}`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      ...this.paramsInfo
    }
  }).then((x) => x.json());

  executePost = () => fetch(`http://localhost:${API_PORT}${this.pathName}`, {
    method: 'POST',
    body: JSON.stringify(this.bodyInfo),
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      ...this.paramsInfo
    }
  }).then((x) => x.json());
}

export default Api;