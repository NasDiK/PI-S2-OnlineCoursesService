import {createAction, createReducer} from '@reduxjs/toolkit';

const initialState = {
  logged: false
};

export const logIn = createAction('LOG_IN');

export default createReducer(initialState, {
  [logIn]: (state) => {
    state.logged = !state.logged;
  }
});