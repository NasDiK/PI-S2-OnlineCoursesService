/* eslint-disable @typescript-eslint/no-explicit-any */
import NotifyStore from '../stores/core/NotifyStore';
import {UserStore} from '../stores/core/UserStore';
import Api from './models/Api';

const init = (): Promise<any> => {
  window.api = () => new Api();

  const _notifyStore = new NotifyStore();
  const _userStore = new UserStore();

  window.notify = (notifier: iNotify) => _notifyStore.push(notifier);

  return Promise.resolve({NotifyStore: _notifyStore, UserStore: _userStore});
};

export {init};