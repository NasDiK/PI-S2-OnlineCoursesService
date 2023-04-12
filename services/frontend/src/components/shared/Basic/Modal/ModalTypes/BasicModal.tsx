import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import s from './BasicModal.module.scss';
import {useEffect} from 'react';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 420,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: 200
};
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