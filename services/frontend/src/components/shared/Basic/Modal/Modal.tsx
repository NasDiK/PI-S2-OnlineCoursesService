import basicModal from './ModalTypes/BasicModal';
import {IOption} from '../DirectoryField/FieldTypes/Select';

export type ModalProps = {
  variant?: 'basic' | 'primary' | 'roundThin' | 'icon',
  buttonText?: string,
  children?: React.ReactNode,
  padding?: string,
  fullWidth?: boolean,
  // eslint-disable-next-line
  onClick?: any, //функция обработчика
  options?: ArrayLike<IOption>,
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