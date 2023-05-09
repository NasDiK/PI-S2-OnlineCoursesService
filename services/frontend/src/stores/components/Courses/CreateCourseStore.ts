/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import {makeAutoObservable, toJS} from 'mobx';
import {iElement} from '../../../components/shared/BigPanelSelector/Components/ColumnElement';
import {targetFields, loadingStatus} from '@local/enums/shared';
import {fieldType} from '@local/enums/tasks';
import {isObject, tryConvertToArray, tryConvertToNumber} from '../../../utils';

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

export default class CreateCourseStore {
  selector;
  loadingStatus;
  targetComponent;
  targetGroup;
  type;

  constructor(type) {
    makeAutoObservable(this, {
      getCorr: false,
      _findInSubgroupRecursiveIdx: false,
      _groupCoursesForSelector: false,
      parseVal: false,
      returnAttachedInSubgroup: false,
      _searchCourses: false,
      getPreparedTasks: false
    }, {autoBind: true});

    this.loadingStatus = loadingStatus.SUCCESS;
    this.type = type; //create || edit

    this.init();
  }

  setLoadingStatus = (loadStatus) => {
    this.loadingStatus = loadStatus;
  };

  setSelector = (selector) => {
    this.selector = selector;
  };

  setTargetComponent = (targetComponent) => {
    this.targetComponent = targetComponent;
  };

  setTargetGroup = (targetGroup) => {
    this.targetGroup = targetGroup;
  };

  resetSelector = () => {
    this.selector = toJS({...minimalComponent, id: -999}); //id 999 - создание
    this.setTargetGroup(undefined);
    this.setTargetComponent(undefined);
  };

  setSelectorProp = (key, val) => {
    this.selector = {...this.selector, [key]: val};
  };

  setDrawerType = (type) => {
    this.type = type;
  };

  async init() {
    if (this.type === 'edit') {
      await this.loadCourses();
    } else {
      this.resetSelector();
    }
  }

  _searchCourses = async() => {
    const result = await window.api().path('/courses/searchCourses')
      .body({
        fields: {
          'task_id': 'tasks.id',
          'task_title': 'tasks.title',
          'task_description': 'tasks.description',
          'task_value': 'tasks.value',
          'task_type': 'tasks.type',
          'task_rightAnswer': 'tasks.correctAnswer',
          'max_note': 'tasks.max_note',
          'course_title': 'courses.title',
          'course_description': 'courses.description',
          'course_id': 'tasks.course_id'
        },
        appends: [
          {
            tableName: 'tasks',
            parentField: 'courses.id',
            joinField: 'course_id'
          }
        ],
        groupBy: 'course_id'
      })
      .executePost();

    return result;
  };

  loadCourses = async() => {
    const _coursesList = await this._searchCourses();
    const _selector = this._groupCoursesForSelector(_coursesList);

    this.setSelector({
      ...minimalComponent,
      name: 'Список курсов',
      subGroup: _selector
    });
    this.setTargetGroup(undefined);
  };

  parseVal = (_val) => {
    const arrayStage = tryConvertToArray(_val);

    if (arrayStage[0] === true) {
      return arrayStage[1];
    }

    const numberStage = tryConvertToNumber(_val);

    return numberStage[1];
  };

  _groupCoursesForSelector = (coursesList: {
    [key: number]: {
      task_id: number,
      task_title: string,
      task_description: string,
      task_value: string,
      task_type: number,
      max_note: number,
      course_title: string,
      course_description: string,
      course_id: number
    }[]
  }) => {
    const subGroupResult = Object.keys(coursesList).reduce((acc: any, key) => {
      const _curCourseTasks = coursesList[key];
      const newElement: iElement = {
        id: Number(key),
        name: _curCourseTasks[0].course_title,
        type: targetFields.ELEMENT_GROUP,
        subGroup: []
      };

      _curCourseTasks.forEach((task) => {
        const template = task.task_type === fieldType.TEXT_AREA ? task['task_value'] : undefined;
        const options = [fieldType.MULTI_ANSWER, fieldType.RADIO].includes(task.task_type) ?
          JSON.parse(task['task_value']) : undefined;
        const answer = task.task_type === fieldType.SINGLE_ANSWER ?
          task.task_rightAnswer : undefined;

        const rightAnswer = this.parseVal(task.task_rightAnswer);

        newElement.subGroup?.push({
          id: task.task_id,
          name: task.task_title,
          type: targetFields.ELEMENT,
          additionals: {
            rightAnswer,
            template,
            options,
            answer,
            taskType: task.task_type,
            description: task.task_description,
            title: task.task_title
          }
        });
      });

      acc.push(newElement);

      return acc;
    }, []);

    return subGroupResult;
  };

  _findInSubgroupRecursiveIdx = (element, findId, path) => {
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

    return element.subGroup
      .map((_el, index) => this._findInSubgroupRecursiveIdx(_el, findId, [...path, index]));
  };

  getCorr = (res) => isObject(res) ? res : res
    .flat(1)
    .filter(Boolean)
    ?.[0]; //Костыль

  returnAttachedInSubgroup = (el, path) => {
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

  addTask = () => {
    const {targetGroup, selector} = this;

    const _newTask = {
      id: new Date().getTime(),
      type: targetFields.ELEMENT,
      name: 'Новая задача',
      additionals: {}
    };

    if (targetGroup && this.type === 'edit') {
      targetGroup.subGroup = [...targetGroup.subGroup, _newTask];

      const targetGroupIdx = selector.subGroup.findIndex(({id}) => id === targetGroup.id);
      const _fp = selector.subGroup.slice(0, targetGroupIdx);
      const _lp = selector.subGroup.slice(targetGroupIdx + 1, selector.subGroup.length);

      this.selector = {
        ...selector,
        subGroup: [..._fp, targetGroup, ..._lp]
      };

      return;
    }

    if (this.type === 'edit') {
      //Не выделена группа, новый создавать нельзя
      return;
    }

    this.selector = {
      ...this.selector,
      subGroup: [...this.selector.subGroup, {..._newTask}]
    };
  };

  deleteTaskById = (taskId) => {
    const {selector} = this;
    const _toRmTask = this._findInSubgroupRecursiveIdx(selector, taskId, []);
    const _corResult = this.getCorr(_toRmTask);

    let _neededSubGroupElement;

    if (_corResult.path.length > 1) {
      _neededSubGroupElement = this.returnAttachedInSubgroup(
        selector, _corResult.path.slice(0, -1)
      );
    } else {
      //Вложенности нет. всё на поверхности
      _neededSubGroupElement = selector;
    }
    const _compToDelIdx = _neededSubGroupElement.subGroup
      .findIndex(({id}) => id === taskId);

    const _fp = _neededSubGroupElement.subGroup.slice(0, _compToDelIdx);
    const _lp = _neededSubGroupElement.subGroup
      .slice(_compToDelIdx + 1, _neededSubGroupElement.subGroup.length);

    _neededSubGroupElement.subGroup = [..._fp, ..._lp];

    //костыль
    if (this.type === 'create') {
      //Нет вложенности
      this.setSelector({..._neededSubGroupElement});
    } else {
      //одинарная вложенность
      const _newSel = toJS(this.selector);

      _newSel.subGroup[_corResult.path[0]] = _neededSubGroupElement;
      this.setSelector(_newSel);
    }

    //снятие таргета
    try {
      this.setTargetComponent(_neededSubGroupElement.subGroup[_compToDelIdx - 1]);
    } catch(_) {
      if (_neededSubGroupElement.subGroup.length - 1) {
        this.setTargetComponent(_neededSubGroupElement.subGroup[0]);
      } else {
        this.setTargetComponent(undefined);
      }
    }
  };

  renameTaskById = (taskId, title) => {
    const {selector} = this;
    const _toRmTask = this._findInSubgroupRecursiveIdx(selector, taskId, []);
    const _corResult = this.getCorr(_toRmTask);

    let _neededSubGroupElement;

    if (_corResult.path.length > 1) {
      _neededSubGroupElement = this.returnAttachedInSubgroup(
        selector, _corResult.path.slice(0, -1)
      );
    } else {
      //Вложенности нет. всё на поверхности
      _neededSubGroupElement = selector;
    }
    const _compToDelIdx = _neededSubGroupElement.subGroup
      .findIndex(({id}) => id === taskId);
    const _compToDel = _neededSubGroupElement.subGroup
      .find(({id}) => id === taskId);

    const _fp = _neededSubGroupElement.subGroup.slice(0, _compToDelIdx);
    const _lp = _neededSubGroupElement.subGroup
      .slice(_compToDelIdx + 1, _neededSubGroupElement.subGroup.length);

    _neededSubGroupElement.subGroup = [..._fp, {
      ..._compToDel,
      name: title
    }, ..._lp];

    //костыль
    if (this.type === 'create') {
      //Нет вложенности
      this.setSelector({..._neededSubGroupElement});
    } else {
      //одинарная вложенность
      const _newSel = toJS(this.selector);

      _newSel.subGroup[_corResult.path[0]] = _neededSubGroupElement;
      this.setSelector(_newSel);
    }
  };

  synchTargetAndSelector = () => {
    const {targetComponent: targetComponentClass, selector} = this;
    const targetComponent = toJS(targetComponentClass);

    if (targetComponent && selector?.subGroup) {
      targetComponent.name = targetComponent?.additionals?.title || '';
      const _findedTarget = this._findInSubgroupRecursiveIdx(selector, targetComponent.id, []);
      const _res = this.getCorr(_findedTarget);

      if (_res.path.length === 1) {
        const _compIndex = selector?.subGroup?.findIndex(({id}) => id === targetComponent.id);

        if (_compIndex !== -1) {
          selector.subGroup[_compIndex] = {...targetComponent};
        }
      } else { //обработка вложенности
        let _tInS: any = selector.subGroup;

        _res.path.slice(0, -1).forEach((pathIdx) => {
          _tInS = _tInS[pathIdx].subGroup;
        });
        _tInS[_res.path.slice(-1)] = targetComponent;
      }

      this.setSelector({...selector});
    }
  };

  getPreparedTasks(subGroup) {
    if (!subGroup?.length) {
      return [];
    }

    return subGroup.reduce((acc, curTask, idx) => {
      const {id} = curTask;

      const {
        taskType,
        title,
        description,
        options, //радио, чекбоксы
        answer, //строчный ответ
        rightAnswer, //радио, чекбоксы
        template //задача свободного ответа
      } = curTask.additionals;

      let _correctAnswer, _value;

      if (template) {
        //Задача свободного ответа
        _value = template;
      }

      if (answer) {
        //задача строчного ответа
        _correctAnswer = answer;
      }

      if (options && rightAnswer) {
        //радио, чекбоксы
        _correctAnswer = rightAnswer;
        _value = options;
      }

      acc.push({
        title,
        description,
        type: taskType,
        weight: idx,
        correctAnswer: _correctAnswer,
        'value': _value,
        selectorTaskId: id
      });

      return acc;
    }, []);
  }

  createCourse = async() => {
    const _courseName = this.selector.name;
    const _courseTasks = this.getPreparedTasks(this.selector?.subGroup);

    const description = prompt('Описание курса', '');

    if (!description) {
      return;
    }

    try {
      await window.api()
        .path('/courses/createCourse')
        .body({
          courseData: {
            title: _courseName,
            description,
            tasks: _courseTasks
          }
        })
        .executePost();

      this.init();

      window.notify({
        message: 'Курс успешно создан',
        variant: 'success'
      });
    } catch(_) {
      window.notify({
        message: 'Ошибка создания курса',
        variant: 'error'
      });
    }

  };

  editTargetCourse = async() => {
    if (!this.targetComponent) {
      return;
    }

    const _courseTasks = this.getPreparedTasks(this.targetGroup?.subGroup);

    const description = confirm('Хотите изменить описание курса?') ?
      prompt('Описание курса', '') : '';

    try {
      await window.api()
        .path('/courses/editCourse')
        .body({
          courseData: {
            id: this.targetGroup.id,
            // title: _courseName, пока не реализовывал)))
            description,
            tasks: _courseTasks
          }
        })
        .executePost();

      this.init();

      window.notify({
        message: `Курс #${this.targetGroup.id} успешно изменён`,
        variant: 'success'
      });
    } catch(_) {
      window.notify({
        message: 'Ошибка изменения курса',
        variant: 'error'
      });
    }
  };
}