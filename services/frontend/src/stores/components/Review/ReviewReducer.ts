import {createAction, createReducer, combineReducers, configureStore} from '@reduxjs/toolkit';
import {iElement} from '../../../components/shared/BigPanelSelector/Components/ColumnElement';
import {shared} from '@local/enums';

export interface iState {
  element?: iElement,
  reviewsList: Array<unknown>,
}

const initialState: iState = {
  element: {
    id: -1,
    type: shared.targetFields.ELEMENT_GROUP,
    name: 'Код-ревью',
    subGroup: []
  },
  reviewsList: []
};

export const setReviewsList = createAction('SET_REVIEWS_LIST', (payload) => payload);
export const setReviewsSelectorGroups = createAction('SET_SELECTOR_GROUPS', (payload) => payload);

const reducer = createReducer(initialState, {
  [setReviewsList.type]: (state: iState, action) => {
    state.reviewsList = action.payload;
  },
  [setReviewsSelectorGroups.type]: (state: iState, action) => {
    state.element = action.payload;
  }
});

const rootReducer = combineReducers({
  reviewStore: reducer
});

export const store = configureStore({
  reducer: rootReducer
});