import TaskModel from '../stores/shared/models/TaskModel';
import Api from '../core/models/Api';

export {};

declare global {
  interface Window {
    api: () => Api;
    notify: (params: iNotify) => void
  }

  interface iValueField {
    type: number; //from enum/task/fieldType,
    options?: Array<{title: string; 'value': string;}>
  }
  interface iTask {
    id: number;
    title?: string;
    description?: string;
    'value'?: Array<iValueField>;
    type?: number; //from enum/task/fieldType
    max_note?: number;
    weight?: number;
  }

  interface IUserStoreState {
    userData: {
      userId: number | null,
      roleId: [],
      accessToken: string | null
    }
  }

  interface iNotify {
    type: 'error' | 'success' | 'info';
    message: string;
  }

  TaskModel;

}
