/* eslint-disable no-console */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {createAction, createReducer, combineReducers, configureStore} from '@reduxjs/toolkit';
import {iElement} from '../../../components/shared/BigPanelSelector/Components/ColumnElement';
import {targetFields, loadingStatus} from '@local/enums/shared';
import {isObject} from '../../../utils';

export interface iState {
  selector: iElement,
  targetComponent?: iElement,
  loadingStatus: number
}

const minimalComponent: iElement = {
  id: -1,
  type: targetFields.ELEMENT_GROUP,
  name: 'Новый курс',
  subGroup: [
    {
      id: 1,
      type: targetFields.ELEMENT,
      name: 'Новая задача',
      additionals: {}
    }
  ]
};

const initialState: iState = {
  selector: {...minimalComponent},
  loadingStatus: loadingStatus.SUCCESS
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

const _findInSubgroupRecursiveIdx = (element, findId, path) => {
  if (!element?.subGroup?.length) {
    return undefined;
  }

  const finded = element.subGroup.findIndex(({id}) => id === findId);

  if (finded !== -1) {
    return {
      inArrayIdx: finded,
      path: [...path, finded]
    };
  }

  return element.subGroup.map((_el, index) => _findInSubgroupRecursiveIdx(_el, findId, [...path, index]));
};

const getCorr = (res) => isObject(res) ? res : res
  .flat(1)
  .filter(Boolean)
  ?.[0]; //Костыль

const returnAttachedSubgroup = (el, path) => {
  let target = el.subGroup;

  for (let i = 0; i < path.length; i++) {
    if (i !== path.length - 1) { // не последний
      // eslint-disable-next-line no-debugger
      // debugger;
      target = target[path[i]].subGroup;
    } else {
      // eslint-disable-next-line no-debugger
      // debugger;

      return target[path[i]];
    }
  }

  return target;
};

export const resetSelector = createAction('RESET_SELECTOR');
export const setSelector = createAction('SET_SELECTOR', (payload) => payload);
export const setSelectorProps = createAction('SET_SELECTOR_PROP', (payload) => payload);
export const setTargetComponent = createAction('SET_TARGET_COMPONENT', (payload) => payload);
export const setTargetComponentProps = createAction('SET_TARGET_COMPONENT_PROP', (payload) => payload);
export const setTargetTaskType = createAction('SET_TARGET_TASK_TYPE', (payload) => payload);
export const setTargetAdditionProps = createAction('SET_TARGET_ADDITIONAL_PROP', (payload) => payload);
export const synchTargetAndSelector = createAction('SYNCH_TARGET_WITH_SELECTOR', (payload) => payload);
export const addTask = createAction('ADD_TASK_FOR_SELECTOR', (payload) => payload);
export const removeTask = createAction('DROP_TASK_FROM_SELECTOR', (payload) => payload);

export const setLoadingStatus = createAction('CRT_DRW_SET_LOADING_STATUS', (payload) => payload);

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

    const _t = _findInSubgroupRecursiveIdx(state.selector, _selectedComponent.id, []);
    const _res = getCorr(_t);

    console.log(_res);
    const component = returnAttachedSubgroup(state.selector, _res.path);

    state.targetComponent = component;
    console.log(state.targetComponent);
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
  [synchTargetAndSelector.type]: (state: iState) => {
    const {targetComponent} = state;

    if (targetComponent && state.selector?.subGroup) {
      // const _compIndexX = _findInSubgroupRecursive(state.selector, targetComponent.id);
      const _compIndex = state.selector?.subGroup?.findIndex(({id}) => id === targetComponent.id);

      if (_compIndex !== -1) {
        state.selector.subGroup[_compIndex] = {...targetComponent};
      }
    }
  },
  [setTargetComponentProps.type]: (state: iState, action) => {
    const {targetComponent} = state;

    if (targetComponent) {
      targetComponent[action.payload.key] = action.payload.value;
    }
  },
  [removeTask.type]: (state: iState, action) => {
    const existTasks = state.selector.subGroup || [];

    const _toDelIdx = existTasks.findIndex(({id}) => id === action.payload.taskId);

    const _fp = existTasks.slice(0, _toDelIdx);
    const _lp = existTasks.slice(_toDelIdx + 1, existTasks.length);

    state.selector.subGroup = [..._fp, ..._lp];
    try {
      state.targetComponent = existTasks[_toDelIdx - 1];
    } catch(_) {
      if (existTasks.length - 1) {
        state.targetComponent = existTasks[0];
      } else {
        state.targetComponent = undefined;
      }
    }
  },
  [resetSelector.type]: (state: iState) => {
    state.selector = {...minimalComponent};
    state.targetComponent = undefined;
  },
  [setLoadingStatus.type]: (state: iState, action) => {
    state.loadingStatus = action.payload;
  }
});

const rootReducer = combineReducers({
  createDrawerStore: reducer
});

export const store = configureStore({
  reducer: rootReducer
});