import Api from '../core/models/Api';

export {};

declare global {
  interface Window {
    api: () => Api;
  }
}
