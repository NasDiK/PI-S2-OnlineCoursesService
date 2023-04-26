import {createAction, createReducer, combineReducers, configureStore} from '@reduxjs/toolkit';

export interface iState {
  users: [],
  tasks: [],
  answers: [],
  groupName: string
}

const initialState: iState = {
  users: [],
  tasks: [],
  answers: [],
  groupName: ''
};

export const setUsers = createAction('SET_USERS', (payload) => payload);
export const setTasks = createAction('SET_TASKS', (payload) => payload);
export const setAnswers = createAction('SET_ANSWERS', (payload) => payload);
export const setGroupName = createAction('SET_GROUP_NAME', (payload) => payload);

const reducer = createReducer(initialState, {
  [setUsers.type]: (state: iState, action) => {
    state.users = action.payload;
  },
  [setTasks.type]: (state: iState, action) => {
    state.tasks = action.payload;
  },
  [setAnswers.type]: (state: iState, action) => {
    state.answers = action.payload;
  },
  [setGroupName.type]: (state: iState, action) => {
    state.groupName = action.payload;
  }
});

const rootReducer = combineReducers({
  studentsStore: reducer
});

export const store = configureStore({
  reducer: rootReducer
});
