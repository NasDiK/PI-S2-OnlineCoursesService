/* eslint-disable no-useless-constructor */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/prop-types */
import React from 'react';
import {ModalProps} from '../Modal';
import Modal from '@mui/material/Modal';
import s from './Modal.module.scss';

class WideModal extends React.Component<ModalProps> {
  constructor(props: ModalProps) {
    super(props);
  }

  render() {
    return (
      <Modal
        open={this.props.isOpen || false}
        // eslint-disable-next-line no-empty-function, @typescript-eslint/no-empty-function
        onClose={this.props.onClose || (() => {})}
      >
        <div className={s.wide}>
          <div className={s.content}>
            {this.props.children}
          </div>
        </div>
      </Modal>
    );
  }
}

export default WideModal;