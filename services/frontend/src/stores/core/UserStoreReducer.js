import {createAction, createReducer} from '@reduxjs/toolkit';

const initialState = {
  logged: true
};

export const logIn = createAction('LOG_IN');
export const logOut = createAction('LOG_OUT');

export default createReducer(initialState, {
  [logIn]: (state) => {
    state.logged = true;
  },
  [logOut]: (state) => {
    state.logged = false;
  }
});