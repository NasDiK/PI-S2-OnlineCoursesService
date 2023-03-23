import {combineReducers, configureStore} from '@reduxjs/toolkit';
import UserStoreReducer from './UserStoreReducer';

const rootReducer = combineReducers({
  userStore: UserStoreReducer
});

export const store = configureStore({
  reducer: rootReducer
});