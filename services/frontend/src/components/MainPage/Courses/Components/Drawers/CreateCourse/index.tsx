/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {useEffect} from 'react';
import {BigPanelSelector, Button, Loader, Modal} from '../../../../../shared';
import {iElement} from '../../../../../shared/BigPanelSelector/Components/ColumnElement';
import s from '../Drawers.module.scss';
import TaskTypeCreator from '../Components/TaskTypeCreator';
import {useDispatch, useSelector} from 'react-redux';
import {targetFields, loadingStatus as loadingStatusEnum} from '@local/enums/shared';
import {fieldType} from '@local/enums/tasks';
import {tryConvertToNumber, tryConvertToArray} from '../../../../../../utils';

const parseVal = (_val) => {
  const arrayStage = tryConvertToArray(_val);

  if (arrayStage[0] === true) {
    return arrayStage[1];
  }

  const numberStage = tryConvertToNumber(_val);

  return numberStage[1];
};

const _searchCourses = async() => {
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

const _groupCoursesForSelector = (coursesList: {
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
      console.log(task);
      const template = task.task_type === fieldType.TEXT_AREA ? task['task_value'] : undefined;
      const options = [fieldType.MULTI_ANSWER, fieldType.RADIO].includes(task.task_type) ?
        JSON.parse(task['task_value']) : undefined;
      const answer = task.task_type === fieldType.SINGLE_ANSWER ? task.task_rightAnswer : undefined;
      const rightAnswer = parseVal(task.task_rightAnswer);

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

interface iPossibleProps {
  isOpen: boolean,
  onClose: () => void,
  view?: 'edit' | 'create'
}

const CreateCourseDrawer = ({isOpen, onClose, view = 'create'}: iPossibleProps) => {
  const dispatch = useDispatch();
  const element = useSelector((stores: any) => stores.createDrawerStore.selector);
  const loadingStatus = useSelector((stores: any) => stores.createDrawerStore.loadingStatus);
  // eslint-disable-next-line max-len
  const setTargetComponent = (component) => {
    console.log(component);

    dispatch({type: 'SET_TARGET_COMPONENT', payload: component});
  };
  const handleChangeCourseName = () => {
    const _newTitle = prompt('');

    if (_newTitle) {
      dispatch({type: 'SET_SELECTOR_PROP', payload: {key: 'name', 'value': _newTitle}});
    }
  };

  useEffect(() => {
    if (view === 'create' && !isOpen) {
      dispatch({type: 'RESET_SELECTOR'});
    }

    if (view === 'edit' && isOpen) {

      _searchCourses().then((result) => {
        console.log(result);

        const _groupedResult = _groupCoursesForSelector(result);

        dispatch({type: 'SET_SELECTOR_PROP', payload: {key: 'subGroup', 'value': _groupedResult}});
        console.log('groupedResult', _groupedResult);
      });
    }
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      variant={'wide'}
    >
      <div className={s.create}>
        {view === 'create' ? <h2>{'Создать курс'}</h2> : <h2>{'Изменить курс'}</h2>}
        <div className={s.courseCreatorWrapper}>
          {loadingStatus === loadingStatusEnum.LOADING && <Loader />}
          <BigPanelSelector
            element={element}
            onClickElement={setTargetComponent}
            renderableComponent={<TaskTypeCreator />}
          />
        </div>
        <div className={s.controls}>
          {
            view === 'create' ?
              <Button>{'Создать курс'}</Button> :
              <Button>{'Изменить курс'}</Button>
          }
          {
            view !== 'edit' &&
            <Button onClick={handleChangeCourseName}>{'Изменить название курса'}</Button>
          }
          <Button
            onClick={
              () => dispatch({type: 'ADD_TASK_FOR_SELECTOR',
                payload: {
                  id: parseInt((Math.random() * 99999).toString()),
                  type: targetFields.ELEMENT,
                  name: 'Новая задача',
                  additionals: {}
                }})
            }
            backgroundColor={'#00FFFF'}
          >{'Добавить новый таск'}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default CreateCourseDrawer;