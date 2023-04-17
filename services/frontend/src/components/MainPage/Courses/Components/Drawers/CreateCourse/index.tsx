import React from 'react';
import {Button, Modal} from '../../../../../shared';

interface iPossibleProps {
  isOpen: boolean,
  onClose: () => void
}

const CreateCourseDrawer = ({isOpen, onClose}: iPossibleProps) => {
  const _t = 1;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      variant={'wide'}
    >
      <div>
        <h2>{'Создать задачу'}</h2>
        <Button>{'Kringe'}</Button>
      </div>
    </Modal>
  );
};

export default CreateCourseDrawer;