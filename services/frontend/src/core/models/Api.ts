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

    return Promise.resolve();
  };

  executePost = () => {
    // eslint-disable-next-line no-console
    console.log('Выполняю post');

    return Promise.resolve();
  };
}

export default new Api();