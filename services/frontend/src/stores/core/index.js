import {combineReducers, configureStore} from '@reduxjs/toolkit';
import UserStoreReducer from 'src/stores/core/UserStoreReducer.ts';

const rootReducer = combineReducers({
  userStore: UserStoreReducer
});

export const store = configureStore({
  reducer: rootReducer
});