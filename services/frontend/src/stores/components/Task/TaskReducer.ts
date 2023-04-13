/* eslint-disable @typescript-eslint/no-explicit-any */
import {createAction, createReducer, combineReducers, configureStore} from '@reduxjs/toolkit';

export interface iState {
  task?: iTask,
  taskLogs?: any
}

const initialState: iState = {
  task: undefined
};

export const setTask = createAction('SET_TASK', (payload) => payload);
export const setTaskLogs = createAction('SET_TASK_LOGS', (payload) => payload);

const reducer = createReducer(initialState, {
  [setTask.type]: (state: iState, action) => {
    state.task = action.payload;
  },
  [setTaskLogs.type]: (state: iState, action) => {
    state.taskLogs = action.payload;
  }
});

const rootReducer = combineReducers({
  taskStore: reducer
});

export const store = configureStore({
  reducer: rootReducer
});