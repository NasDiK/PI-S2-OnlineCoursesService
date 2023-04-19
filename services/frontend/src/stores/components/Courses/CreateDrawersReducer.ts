/* eslint-disable @typescript-eslint/no-explicit-any */
import {createAction, createReducer, combineReducers, configureStore} from '@reduxjs/toolkit';
import {iElement} from '../../../components/shared/BigPanelSelector/Components/ColumnElement';
import {targetFields} from '@local/enums/shared';

export interface iState {
  selector: iElement
}

const minimalComponent: iElement = {
  id: -1,
  type: targetFields.ELEMENT_GROUP,
  name: 'test',
  subGroup: [
    {
      id: 1,
      type: targetFields.ELEMENT,
      name: 'Prikol'
    },
    {
      id: 2,
      type: targetFields.ELEMENT,
      name: 'Prikol2'
    },
    {
      id: -1,
      type: targetFields.ELEMENT_GROUP,
      name: 'Group',
      subGroup: [
        {
          id: 3,
          name: 'test',
          type: targetFields.ELEMENT
        }
      ]
    }
  ]
};

const initialState: iState = {
  selector: {...minimalComponent}
};

const _insertElement = (arr: any[] | undefined, element, idx = null) => {
  if (!arr) {
    return;
  }

  if (idx) {
    const firstPart = arr.slice(0, idx);
    const lastPart = arr.slice(idx + 1, arr.length);

    return [...firstPart, element, ...lastPart];
  }

  return [...arr, element];
};

export const setSelector = createAction('SET_SELECTOR', (payload) => payload);
export const addTask = createAction('ADD_TASK_FOR_SELECTOR', (payload) => payload);
export const removeTask = createAction('REMOVE_TASK_FROM_SELECTOR', (payload) => payload);

const reducer = createReducer(initialState, {
  [setSelector.type]: (state: iState, action) => {
    state.selector = action.payload;
  },
  [addTask.type]: (state: iState, action) => {
    const _newArr = _insertElement(state.selector?.subGroup, action.payload);

    state.selector.subGroup = _newArr;
  }
});

const rootReducer = combineReducers({
  createDrawerStore: reducer
});

export const store = configureStore({
  reducer: rootReducer
});