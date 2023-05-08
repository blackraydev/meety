import { DefaultProps } from '../../types';
import * as UI from './Modal.styles';

type ModalProps = DefaultProps & {
  onClose: () => void;
  title?: string;
};

export const Modal = ({ onClose, title, children }: ModalProps) => {
  return (
    <UI.ModalWrapper>
      <UI.Modal>
        <UI.ModalTitle>{title}</UI.ModalTitle>
        <UI.CloseIcon onClick={onClose} size={36} />
        <UI.ModalContent>{children}</UI.ModalContent>
      </UI.Modal>
    </UI.ModalWrapper>
  );
};
