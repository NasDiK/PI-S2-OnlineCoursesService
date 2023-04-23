/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import {BigPanelSelector, Button, Modal} from '../../../../../shared';
import {iElement} from '../../../../../shared/BigPanelSelector/Components/ColumnElement';
import s from '../Drawers.module.scss';
import TaskTypeCreator from '../Components/TaskTypeCreator';
import {useDispatch, useSelector} from 'react-redux';

interface iPossibleProps {
  isOpen: boolean,
  onClose: () => void
}

const CreateCourseDrawer = ({isOpen, onClose}: iPossibleProps) => {
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

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      variant={'wide'}
    >
      <div className={s.create}>
        <h2>{'Создать курс'}</h2>
        <div className={s.courseCreatorWrapper}>
          <BigPanelSelector
            element={element}
            onClickElement={setTargetComponent}
            renderableComponent={<TaskTypeCreator />}
          />
        </div>
        <div className={s.controls}>
          <Button>{'Создать курс'}</Button>
          <Button onClick={handleChangeCourseName}>{'Изменить название курса'}</Button>
        </div>
      </div>
    </Modal>
  );
};

export default CreateCourseDrawer;