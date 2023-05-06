/* eslint-disable react/prop-types */
/* eslint-disable max-len */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {useEffect} from 'react';
import {BigPanelSelector, Button, Loader, Modal} from '../../../../../shared';
import s from '../Drawers.module.scss';
import TaskTypeCreator from '../Components/TaskTypeCreator';
import {loadingStatus as loadingStatusEnum} from '@local/enums/shared';
import {magic} from '../../../../../../mobxUtils';

interface iPossibleProps {
  isOpen: boolean,
  onClose: () => void,
  type?: 'edit' | 'create',
  setMobxTargetComponent?: any,
  selector?: any,
  loadingStatus?: number,
  loadCourses?: any,
  addTask?: any,
  resetSelector?: any,
  setSelectorProp?: any,
  setTargetGroup?: any,
  createCourse?: any,
  editTargetCourse?: any,
  targetGroup?: any
}

const CreateCourseDrawer = (props: iPossibleProps) => {
  const {isOpen, onClose, type = 'create'} = props;
  const {
    setMobxTargetComponent,
    selector,
    loadingStatus,
    loadCourses,
    addTask,
    resetSelector,
    setSelectorProp,
    setTargetGroup,
    createCourse,
    editTargetCourse,
    targetGroup
  } = props;

  const handleChangeCourseName = () => {
    const _newTitle = prompt('');

    if (_newTitle) {
      setSelectorProp('name', _newTitle);
    }
  };

  useEffect(() => {
    if (type === 'create' && !isOpen) {
      resetSelector();
    }

    if (type === 'edit' && isOpen) {
      loadCourses();
    }
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      variant={'wide'}
    >
      <div className={s.create}>
        {type === 'create' ? <h2>{'Создать курс'}</h2> : <h2>{'Изменить курс'}</h2>}
        <div className={s.courseCreatorWrapper}>
          {loadingStatus === loadingStatusEnum.LOADING && <Loader />}
          <BigPanelSelector
            element={selector}
            onClickElement={setMobxTargetComponent}
            renderableComponent={<TaskTypeCreator />}
            onClickGroup={setTargetGroup}
          />
        </div>
        <div className={s.controls}>
          {
            type === 'create' ?
              <Button onClick={createCourse}>{'Создать курс'}</Button> :
              targetGroup && <Button onClick={editTargetCourse}>{'Изменить курс'}</Button> || null
          }
          {
            type === 'create' &&
            <Button onClick={handleChangeCourseName}>{'Изменить название курса'}</Button>
          }
          <Button onClick={addTask} backgroundColor={'#00FFFF'}>{'Добавить новый таск'}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

const mapStore = ({CreateCourseStore}) => {
  return {
    setMobxTargetComponent: CreateCourseStore.setTargetComponent,
    selector: CreateCourseStore.selector,
    loadingStatus: CreateCourseStore.loadingStatus,
    loadCourses: CreateCourseStore.loadCourses,
    addTask: CreateCourseStore.addTask,
    resetSelector: CreateCourseStore.resetSelector,
    setSelectorProp: CreateCourseStore.setSelectorProp,
    setDrawerType: CreateCourseStore.setDrawerType,
    setTargetGroup: CreateCourseStore.setTargetGroup,
    createCourse: CreateCourseStore.createCourse,
    editTargetCourse: CreateCourseStore.editTargetCourse,
    targetGroup: CreateCourseStore.targetGroup
  };
};

export default magic(CreateCourseDrawer, {store: mapStore});