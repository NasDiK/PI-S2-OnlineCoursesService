import {createAction, createReducer} from '@reduxjs/toolkit';

const initialState = {
  logged: true,
  userId: null,
  roleId: null
};

export const logIn = createAction('LOG_IN', (payload) => payload);
export const logOut = createAction('LOG_OUT');

export default createReducer(initialState, {
  [logIn]: (state, action) => {
    state.logged = true;
    // eslint-disable-next-line no-console
    console.log(action);
  },
  [logOut]: (state, action) => {
    state.logged = false;
    // eslint-disable-next-line no-console
    console.log(action);
  }
});