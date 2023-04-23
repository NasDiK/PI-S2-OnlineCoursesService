/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {createAction, createReducer, combineReducers, configureStore} from '@reduxjs/toolkit';
import {iElement} from '../../../components/shared/BigPanelSelector/Components/ColumnElement';
import {targetFields} from '@local/enums/shared';

export interface iState {
  selector: iElement,
  targetComponent?: iElement
}

const minimalComponent: iElement = {
  id: -1,
  type: targetFields.ELEMENT_GROUP,
  name: 'test',
  subGroup: [
    {
      id: 1,
      type: targetFields.ELEMENT,
      name: 'Prikol',
      additionals: {}
    },
    {
      id: 2,
      type: targetFields.ELEMENT,
      name: 'Prikol2',
      additionals: {}
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
export const setSelectorProps = createAction('SET_SELECTOR_PROP', (payload) => payload);
export const setTargetComponent = createAction('SET_TARGET_COMPONENT', (payload) => payload);
export const setTargetTaskType = createAction('SET_TARGET_TASK_TYPE', (payload) => payload);
export const setTargetAdditionProps = createAction('SET_TARGET_ADDITIONAL_PROP', (payload) => payload);
export const synchTargetAndSelector = createAction('SYNCH_TARGET_WITH_SELECTOR', (payload) => payload);
export const addTask = createAction('ADD_TASK_FOR_SELECTOR', (payload) => payload);
export const removeTask = createAction('REMOVE_TASK_FROM_SELECTOR', (payload) => payload);

const reducer = createReducer(initialState, {
  [setSelector.type]: (state: iState, action) => {
    state.selector = action.payload;
  },
  [setSelectorProps.type]: (state: iState, action) => {
    const _curComp = state.selector;

    if (!_curComp) {
      return;
    }

    _curComp[action.payload.key] = action.payload.value;
  },
  [addTask.type]: (state: iState, action) => {
    const _newArr = _insertElement(state.selector?.subGroup, action.payload);

    state.selector.subGroup = _newArr;
  },
  [setTargetComponent.type]: (state: iState, action) => {
    const _selectedComponent = action.payload;

    const component = state.selector.subGroup
      ?.find(({id}) => id === _selectedComponent.id);

    state.targetComponent = component;
  },
  [setTargetTaskType.type]: (state: iState, action) => {
    const _selectedComponent = state.selector.subGroup
      ?.find(({id}) => id === state.targetComponent?.id);

    _selectedComponent && (_selectedComponent.additionals && (
      _selectedComponent.additionals.taskType = action.payload.taskType
    ) || (
      _selectedComponent.additionals = {
        taskType: action.payload.taskType
      }
    ));

    if (state.targetComponent?.additionals) {
      state.targetComponent.additionals.taskType = action.payload.taskType;
    } else if (state.targetComponent && !state.targetComponent.additionals) {
      state.targetComponent.additionals = {
        taskType: action.payload.taskType
      };
    }
  },
  [setTargetAdditionProps.type]: (state: iState, action) => {
    // eslint-disable-next-line no-console
    console.log(action.payload.key, action.payload.value);
    if (state.targetComponent) {
      const {additionals} = state.targetComponent;

      if (additionals) {
        additionals[action.payload.key] = action.payload.value;
      } else {
        state.targetComponent.additionals = {[action.payload.key]: action.payload.value};
      }
    }
  },
  [synchTargetAndSelector.type]: (state: iState, action) => {
    const {targetComponent} = state;

    if (targetComponent && state.selector?.subGroup) {
      const _compIndex = state.selector?.subGroup?.findIndex(({id}) => id === targetComponent.id);

      if (_compIndex !== -1) {
        state.selector.subGroup[_compIndex] = {...targetComponent};
      }
    }
  }
});

const rootReducer = combineReducers({
  createDrawerStore: reducer
});

export const store = configureStore({
  reducer: rootReducer
});