import React from 'react';
import {Provider} from 'react-redux';
import {store as taskStore} from '../../../../stores/components/Task/TaskReducer';
import TaskView from './TaskView';

export interface iValueField {
  type: number; //from enum/task/fieldType,
  options?: Array<{title: string; 'value': string;}>
}

export interface iTask {
  id: number;
  title?: string;
  description?: string;
  'value'?: Array<iValueField>;
  type?: number; //from enum/task/fieldType //а надо ли, если у нас value есть
  max_note?: number;
  weight?: number; //todo вынести в панель, отсюда убрать
}

const Task = () => (
  <Provider store={taskStore}>
    <TaskView />
  </Provider>
);

export default Task;