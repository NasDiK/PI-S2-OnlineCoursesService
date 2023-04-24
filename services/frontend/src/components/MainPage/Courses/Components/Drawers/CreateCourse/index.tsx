/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {useEffect} from 'react';
import {BigPanelSelector, Button, Modal} from '../../../../../shared';
import {iElement} from '../../../../../shared/BigPanelSelector/Components/ColumnElement';
import s from '../Drawers.module.scss';
import TaskTypeCreator from '../Components/TaskTypeCreator';
import {useDispatch, useSelector} from 'react-redux';
import {targetFields} from '@local/enums/shared';

interface iPossibleProps {
  isOpen: boolean,
  onClose: () => void,
  view?: 'edit' | 'create'
}

const CreateCourseDrawer = ({isOpen, onClose, view = 'create'}: iPossibleProps) => {
  const dispatch = useDispatch();
  const element = useSelector((stores: any) => stores.createDrawerStore.selector);
  // eslint-disable-next-line max-len
  const setTargetComponent = (component) => dispatch({type: 'SET_TARGET_COMPONENT', payload: component});
  const handleChangeCourseName = () => {
    const _newTitle = prompt('');

    if (_newTitle) {
      dispatch({type: 'SET_SELECTOR_PROP', payload: {key: 'name', 'value': _newTitle}});
    }
  };

  useEffect(() => {
    // eslint-disable-next-line no-console
    !isOpen && console.log('clear eee');

    if (view === 'create') {
      dispatch({type: 'RESET_SELECTOR'});
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
          <Button onClick={handleChangeCourseName}>{'Изменить название курса'}</Button>
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