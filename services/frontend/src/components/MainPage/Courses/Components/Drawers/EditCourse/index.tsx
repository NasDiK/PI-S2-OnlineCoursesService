import React from 'react';
import {Modal} from '../../../../../shared';

interface iPossibleProps {
  isOpen: boolean,
  onClose: () => void
}

const EditCourseDrawer = ({isOpen, onClose}: iPossibleProps) => {
  const _t = 1;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      variant={'wide'}
    >
      <span>{'EditDrawer'}</span>
    </Modal>
  );
};

export default EditCourseDrawer;