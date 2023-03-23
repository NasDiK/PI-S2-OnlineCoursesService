import {createAction, createReducer} from '@reduxjs/toolkit';

export interface AuthState {
  userData: {
    userId: number | null,
    roleId: [],
    accessToken: string | null
  }
}

const initialState: AuthState = {
  userData: {
    userId: null,
    roleId: [],
    accessToken: null
  }
};

export const logIn = createAction('LOG_IN', (payload) => payload);
export const logOut = createAction('LOG_OUT');
export const check = createAction('CHECK');

export default createReducer(initialState, {
  [logIn.type]: (state: AuthState, action) => {
    if (action.payload.userId) {
      state.userData.userId = action.payload.userId;
      state.userData.roleId = action.payload.roleId;
      state.userData.accessToken = action.payload.accessToken;
    }
  },
  [logOut.type]: (state) => {
    state.userData.userId = null;
    state.userData.roleId = [];
    state.userData.accessToken = null;
  },
  [check.type]: (state) => {
    const res = window.api().path('/auth/check')
      .executePost();

    state.userData.accessToken = res.accessToken;
  },
  default: (state: AuthState) => state
});