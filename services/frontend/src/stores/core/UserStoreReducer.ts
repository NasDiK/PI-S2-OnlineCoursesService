import {createAction, createReducer} from '@reduxjs/toolkit';

const initialState: IUserStoreState = {
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
  [logIn.type]: (state: IUserStoreState, action) => {
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
    window.api().path('/auth/check')
      .executePost()
      .then((x) => {
        state.userData.accessToken = x.accessToken;
      });
  },
  default: (state: IUserStoreState) => state
});