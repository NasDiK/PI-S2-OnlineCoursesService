import React from 'react';
import {Provider} from 'react-redux';
import {store as taskReducer} from '../../../../stores/components/Task/TaskReducer';
import TaskView from './TaskView';

const Task = () => (
  <Provider store={taskReducer}>
    <TaskView />
  </Provider>
);

export default Task;