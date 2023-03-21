import {createAction, createReducer, combineReducers, configureStore} from '@reduxjs/toolkit';
import {getTaskById} from '../../../api/tasks';
import {iTask} from '../../../components/MainPage/Course/Components/Task';

export interface iState {
  task?: iTask
}

const initialState: iState = {
  task: undefined
};

export const setTask = createAction('SET_TASK', (payload) => payload);

const reducer = createReducer(initialState, {
  [setTask.type]: (state: iState, action) => {
    // eslint-disable-next-line no-console
    console.log(action);
    state.task = action.payload;
  }
});

const rootReducer = combineReducers({
  taskStore: reducer
});

export const store = configureStore({
  reducer: rootReducer
});