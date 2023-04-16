import * as React from 'react';
import Modal from '@mui/material/Modal';
import s from './BasicModal.module.scss';
import {useEffect} from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const BasicModal = (props: any) => {
  const [open, setOpen] = React.useState(false);
  const modalSetClose = props?.onClose;

  useEffect(() => {
    setOpen(props.isOpen);
  }, [props.isOpen]);
  const handleClose = () => {
    setOpen(false);

    if (typeof modalSetClose === typeof Function) {
      modalSetClose();
    }
  };

  return (
    <div className={s.form}>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <div className={s.style}>
          {props.children}
        </div>
      </Modal>
    </div>
  );
};

export default BasicModal;