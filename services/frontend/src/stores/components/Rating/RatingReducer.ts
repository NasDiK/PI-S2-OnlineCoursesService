/* eslint-disable id-denylist,camelcase, @typescript-eslint/no-explicit-any*/
import {createAction, createReducer, combineReducers, configureStore} from '@reduxjs/toolkit';
import {status as statusEnum} from '@local/enums/shared';

export interface iState {
  answers: any [],
  usersIds: any [],
  users: any [],
  usersRating: any []
}

const initialState: iState = {
  answers: [],
  usersIds: [],
  users: [],
  usersRating: []
};

export const setAnswers = createAction('SET_ANSWERS', (payload) => payload);
export const setUsers = createAction('SET_USERS', (payload) => payload);

const reducer = createReducer(initialState, {
  [setAnswers.type]: (state: iState, action) => {
    state.answers = action.payload;
    const usersIdsArray:any = [];

    state.answers.forEach((answer) => {
      if (!usersIdsArray.includes(answer.user_id)) {
        usersIdsArray.push(answer.user_id);
      }
    });
    state.usersIds = usersIdsArray;
  },
  [setUsers.type]: (state: iState, action) => {
    state.users = action.payload;
    const newArray:any = [];

    if (!state.users) {
      return;
    }
    state.users.forEach((user) => {
      const count = state.answers
        .filter((answer) => answer.user_id === user.id)
        .filter((answer) => answer.status === statusEnum.SUCCESS).length;

      newArray.push({user: user.fullname, count});
    });
    state.usersRating = newArray.sort((a, b) => a.count > b.count ? -1 : 1);
  }
});

const rootReducer = combineReducers({
  ratingStore: reducer
});

export const store = configureStore({
  reducer: rootReducer
});
