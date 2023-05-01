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
  loadingStatus: number,
  updatedTasksIds: number[]
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
  loadingStatus: loadingStatus.SUCCESS,
  updatedTasksIds: [] //Для отслеживание какие задачи курса обновляем. Если курс создаётся - то не записываем
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

const returnAttachedInSubgroup = (el, path) => {
  let target = el.subGroup;

  for (let i = 0; i < path.length; i++) {
    if (i !== path.length - 1) { // не последний
      target = target[path[i]].subGroup;
    } else {
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

    const component = returnAttachedInSubgroup(state.selector, _res.path);

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
  [synchTargetAndSelector.type]: (state: iState) => {
    const {targetComponent} = state;

    if (targetComponent && state.selector?.subGroup) {
      const _findedTarget = _findInSubgroupRecursiveIdx(state.selector, targetComponent.id, []);
      const _res = getCorr(_findedTarget);

      if (_res.path.length === 1) {
        const _compIndex = state.selector?.subGroup?.findIndex(({id}) => id === targetComponent.id);

        if (_compIndex !== -1) {
          state.selector.subGroup[_compIndex] = {...targetComponent};
        }
      } else { //обработка вложенности
        let _tInS: any = state.selector.subGroup;

        _res.path.slice(0, -1).forEach((pathIdx) => {
          _tInS = _tInS[pathIdx].subGroup;
        });
        _tInS[_res.path.slice(-1)] = targetComponent;
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
    const _toRmTask = _findInSubgroupRecursiveIdx(state.selector, action.payload.taskId, []);
    const _corResult = getCorr(_toRmTask);

    let _neededSubGroupElement;

    if (_corResult.path.length > 1) {
      _neededSubGroupElement = returnAttachedInSubgroup(state.selector, _corResult.path.slice(0, -1));
    } else {
      //Вложенности нет. всё на поверхности
      _neededSubGroupElement = state.selector;
    }
    const _compToDelIdx = _neededSubGroupElement.subGroup.findIndex(({id}) => id === action.payload.taskId);

    // _neededSubGroupElement = returnAttachedInSubgroup(state.selector, _corResult.path.slice(0, -1));
    // _compToDelIdx = _neededSubGroupElement.subGroup.findIndex(({id}) => id === action.payload.taskId);

    const _fp = _neededSubGroupElement.subGroup.slice(0, _compToDelIdx);
    const _lp = _neededSubGroupElement.subGroup.slice(_compToDelIdx + 1, _neededSubGroupElement.subGroup.length);

    _neededSubGroupElement.subGroup = [..._fp, ..._lp];

    //снятие таргета
    try {
      state.targetComponent = _neededSubGroupElement.subGroup[_compToDelIdx - 1];
    } catch(_) {
      if (_neededSubGroupElement.subGroup.length - 1) {
        state.targetComponent = _neededSubGroupElement.subGroup[0];
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