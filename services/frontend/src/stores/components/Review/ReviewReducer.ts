import {createAction, createReducer, combineReducers, configureStore} from '@reduxjs/toolkit';
import {iElement} from '../../../components/shared/BigPanelSelector/Components/ColumnElement';
import {shared} from '@local/enums';

export interface iState {
  element?: iElement
}

const initialState: iState = {
  element: {
    id: -1,
    type: shared.targetFields.ELEMENT_GROUP,
    name: 'ROT EBAL',
    isDone: false,
    subGroup: [
      {
        id: 1,
        type: shared.targetFields.ELEMENT_GROUP,
        name: 'ПИ 20.01',
        subGroup: [
          {
            id: 1,
            type: shared.targetFields.ELEMENT_GROUP,
            name: 'Тунгусов А.С.',
            subGroup: [
              {
                id: 2,
                type: shared.targetFields.ELEMENT,
                name: 'Задача 1'
              },
              {
                id: 3,
                type: shared.targetFields.ELEMENT,
                name: 'Задача 2'
              }
            ]
          }
        ]
      }
    ], //iElement[]
    progress: 10,
    'max_note': undefined
  }
};

// export const setTask = createAction('SET_TASK', (payload) => payload);

const reducer = createReducer(initialState, {
//   [setTask.type]: (state: iState, action) => {
//     state.task = action.payload;
//   }
});

const rootReducer = combineReducers({
  reviewStore: reducer
});

export const store = configureStore({
  reducer: rootReducer
});