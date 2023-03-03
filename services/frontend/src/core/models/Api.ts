import {API_PORT} from '@local/documentation';

class Api {
  serviceName?: string;
  paramsInfo?: object;
  bodyInfo?: object;

  //TODO Добавить мету пользователя

  service = (name: string) => {
    this.serviceName = name;

    return this;
  };

  params = (param: object) => {
    this.paramsInfo = param;

    return this;
  };

  body = (body: object) => {
    this.bodyInfo = body;

    return this;
  };

  executeGet = () => {
    // eslint-disable-next-line no-console
    console.log('Выполняю get');

    return fetch(`localhost:${API_PORT}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'params': this.paramsInfo
      })
    });
  };

  executePost = () => {
    // eslint-disable-next-line no-console
    console.log('Выполняю post');

    return fetch(`localhost:${API_PORT}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'params': this.paramsInfo,
        'body': this.bodyInfo
      })
    });
  };
}

export default new Api();