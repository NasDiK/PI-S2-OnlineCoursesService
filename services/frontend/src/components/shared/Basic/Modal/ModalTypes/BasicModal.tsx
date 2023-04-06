import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '../../Button/Button';
import DirectoryField from '../../DirectoryField/DirectoryField';
import {shared} from '@local/enums';
import {createGroup} from '../../../../../api/groups';

const {fieldType} = shared;

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  gap: '15px'
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const BasicModal = (props: any) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>{props.buttonText}</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          {props.children}
        </Box>
      </Modal>
    </div>
  );
};

export default BasicModal;