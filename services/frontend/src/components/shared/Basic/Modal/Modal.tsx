import basicModal from './ModalTypes/BasicModal';
import WideModal from './ModalTypes/WideModal';

export type ModalProps = {
  variant?: 'basic' | 'wide',
  children: React.ReactElement,
  fullWidth?: boolean,
  isOpen?: boolean,
  onClose?: () => void
};

const Modal = (props: ModalProps) => {
  const {variant, ...otherProps} = props;

  switch (variant) {
    case 'wide':
      // eslint-disable-next-line react/react-in-jsx-scope
      return <WideModal {...otherProps} />;
    case 'basic':
    default:
      return basicModal(otherProps);
  }
};

export default Modal;