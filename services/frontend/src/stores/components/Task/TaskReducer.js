import {createAction, createReducer, combineReducers, configureStore} from '@reduxjs/toolkit';
import {getTaskFromApi} from './TaskMethods.ts';

const initialState = {
  task: {}
};

export const getTask = createAction('GET_TASK');

const reducer = createReducer(initialState, {
  [getTask]: (state) => {
    state.task = getTaskFromApi();
  }
});

const rootReducer = combineReducers({
  taskStore: reducer
});

export const store = configureStore({
  reducer: rootReducer
});