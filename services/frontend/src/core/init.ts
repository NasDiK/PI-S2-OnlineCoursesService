import Api from './models/Api';

const init = (): Promise<void> => {
  window.api = () => new Api();

  return Promise.resolve();
};

export {init};