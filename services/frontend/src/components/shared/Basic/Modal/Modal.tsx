import basicModal from './ModalTypes/BasicModal';
import {IOption} from '../DirectoryField/FieldTypes/Select';

export type ModalProps = {
  variant?: 'basic' | 'primary' | 'roundThin' | 'icon',
  buttonText?: string,
  children?: React.ReactNode,
  padding?: string,
  fullWidth?: boolean,
  onClick?: any, //функция обработчика
  options?: ArrayLike<IOption>
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