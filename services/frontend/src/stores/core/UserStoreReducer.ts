import {createAction, createReducer} from '@reduxjs/toolkit';

export interface AuthState {
  userData: {
    logged: boolean,
    userId: number | null,
    roleId: [],
    accessToken: string | null
  }
}

const initialState: AuthState = {
  userData: {
    logged: false,
    userId: null,
    roleId: [],
    accessToken: null
  }
};

export const logIn = createAction('LOG_IN', (payload) => payload);
export const logOut = createAction('LOG_OUT');

export default createReducer(initialState, {
  [logIn.type]: (state: AuthState, action) => {
    if (action.payload.userId) {
      state.userData.logged = true;
      state.userData.userId = action.payload.userId;
      state.userData.roleId = action.payload.roleId;
      state.userData.accessToken = action.payload.tokens.accessToken;
    }
  },
  [logOut.type]: (state, action) => {
    state.userData.logged = false;
    // eslint-disable-next-line no-console
    console.log(action);
  },
  default: (state: AuthState) => state
});