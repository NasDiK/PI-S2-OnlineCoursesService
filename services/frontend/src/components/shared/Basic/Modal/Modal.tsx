import basicModal from './ModalTypes/BasicModal';

export type ModalProps = {
  variant?: 'basic',
  children?: React.ReactNode,
  fullWidth?: boolean,
  isOpen?: boolean,
  // eslint-disable-next-line
  onClose?: any
};

const Modal = (props: ModalProps) => {
  const {variant, ...otherProps} = props;

  switch (variant) {
    case 'basic':
      return basicModal(otherProps);
    default:
      return basicModal(otherProps);
  }
};

export default Modal;