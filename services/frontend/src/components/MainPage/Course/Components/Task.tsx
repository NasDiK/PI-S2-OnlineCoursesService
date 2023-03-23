import React from 'react';
import {Provider} from 'react-redux';
import {store as taskStore} from '../../../../stores/components/Task/TaskReducer';
import TaskView from './TaskView';

const Task = () => (
  <Provider store={taskStore}>
    <TaskView />
  </Provider>
);

export default Task;