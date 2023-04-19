/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import {BigPanelSelector, Button, Modal} from '../../../../../shared';
import {iElement} from '../../../../../shared/BigPanelSelector/Components/ColumnElement';
import s from '../Drawers.module.scss';
import TaskTypeCreator from '../Components/TaskTypeCreator';
import {useSelector} from 'react-redux';

interface iPossibleProps {
  isOpen: boolean,
  onClose: () => void
}

const CreateCourseDrawer = ({isOpen, onClose}: iPossibleProps) => {
  const element = useSelector((stores: any) => stores.createDrawerStore.selector);

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
            onClickElement={
              (_element) => {
                // eslint-disable-next-line no-console
                console.log(_element);
              }
            }
            renderableComponent={<TaskTypeCreator />}
          />
        </div>
        <Button>{'Kringe'}</Button>
      </div>
    </Modal>
  );
};

export default CreateCourseDrawer;