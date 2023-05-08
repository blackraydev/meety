import styled from 'styled-components';
import { IoClose } from 'react-icons/io5';

export const ModalWrapper = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgb(0, 0, 0, 0.2);
`;

export const Modal = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.primary};
  width: 520px;
  height: 400px;
  border-radius: 16px;
  padding: 25px;
`;

export const ModalTitle = styled.h2`
  font-weight: 500;
  color: ${({ theme }) => theme.colors.primaryText};
`;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 25px;
  gap: 15px;
`;

export const CloseIcon = styled(IoClose)`
  transition: 0.2s ease;
  cursor: pointer;
  position: absolute;
  top: 16px;
  right: 20px;
  color: ${({ theme }) => theme.colors.gray};

  &:hover {
    color: ${({ theme }) => theme.colors.icon};
  }
`;
