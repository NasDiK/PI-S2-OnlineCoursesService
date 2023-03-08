import Api from './models/Api';

const api = Api;

const init = (): Promise<void> => {
  window.api = api;

  return Promise.resolve();
};

export {init};