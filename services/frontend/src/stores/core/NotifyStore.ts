/* eslint-disable @typescript-eslint/no-explicit-any */
import {makeAutoObservable, toJS} from 'mobx';

class NotifyStore {
  notifiers: Array<number> = [];
  notifiersObject: any;

  constructor() {
    makeAutoObservable(this, {
      push: false
    }, {autoBind: true});
  }

  push = (_notify: iNotify) => {
    _notify.time = _notify.time ?? 3000;

    const _notifierId = new Date().getTime() + Math.random();

    this._setNotifiers([...this.notifiers, _notifierId]);
    this._setNotifyObject({...this.notifiersObject, [_notifierId]: _notify});
  };

  _setNotifiers = (notifiers) => {
    this.notifiers = notifiers;
  };

  _setNotifyObject = (obj) => {
    this.notifiersObject = obj;
  };

  dropNotifier = (id) => {
    const _newObj = toJS(this.notifiersObject);
    const _newArr = toJS(this.notifiers);

    delete _newObj[id];

    this._setNotifyObject(_newObj);
    this._setNotifiers(_newArr.filter((notiId) => notiId !== id));
  };
}

export default NotifyStore;