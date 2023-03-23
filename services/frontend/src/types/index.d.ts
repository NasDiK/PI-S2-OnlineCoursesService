import Api from '../core/models/Api';

export {};

export interface iNotify {
  type: 'error' | 'success' | 'info';
  message: string;
}

declare global {
  interface Window {
    api: () => Api;
    notify: (params: iNotify) => void
  }
}
