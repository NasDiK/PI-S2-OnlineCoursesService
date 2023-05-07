/* eslint-disable id-denylist,camelcase, @typescript-eslint/no-explicit-any*/
import {createAction, createReducer, combineReducers, configureStore} from '@reduxjs/toolkit';
import {setUsersRoles} from '../../../api/roles';

export interface iState {
  users: any [],
  roles: any [],
  usersOptions: any [],
  rolesOptions: any [],
  selectedUsers: any [],
  selectedRole: any []
}

const initialState: iState = {
  users: [],
  roles: [],
  usersOptions: [],
  rolesOptions: [],
  selectedUsers: [],
  selectedRole: []
};

export const setUsers = createAction('SET_USERS', (payload) => payload);
export const setRoles = createAction('SET_ROLE', (payload) => payload);
export const changeRoles = createAction('CHANGE_ROLES', (payload) => payload);
export const setSelectedUsers = createAction('SET_SELECTED_USERS', (payload) => payload);
export const setSelectedRole = createAction('SET_SELECTED_ROLE', (payload) => payload);
export const clearSelected = createAction('CLEAR_SELECTED', (payload) => payload);

const reducer = createReducer(initialState, {
  [setUsers.type]: (state: iState, action) => {
    state.users = action.payload;
    state.usersOptions = [];
    state.usersOptions = state.users.map((user) => {
      return {value: user.id, label: user.fullname};
    });
  },
  [setSelectedUsers.type]: (state: iState, action) => {
    state.selectedUsers = action.payload;
  },
  [setSelectedRole.type]: (state: iState, action) => {
    state.selectedRole = action.payload;
    state.selectedUsers = state.users.filter((user) =>
      user.role_id === state.selectedRole).map((user) => user.id);
  },
  [clearSelected.type]: (state: iState) => {
    state.selectedRole = [];
    state.selectedUsers = [];
  },
  [setRoles.type]: (state: iState, action) => {
    state.roles = action.payload;
    state.rolesOptions = state.roles.filter((role) => role.name !== 'admin')
      .map((role) => {
        return {value: role.id, label: role.title};
      });
  },
  [changeRoles.type]: (state: iState) => {
    setUsersRoles(state.selectedRole, state.selectedUsers);
  }
});

const rootReducer = combineReducers({
  adminStore: reducer
});

export const store = configureStore({
  reducer: rootReducer
});