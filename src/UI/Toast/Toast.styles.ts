import styled from 'styled-components';
import { IoClose } from 'react-icons/io5';
import { BiErrorCircle } from 'react-icons/bi';

export const Toast = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  height: 60px;
  min-width: 280px;
  background: ${({ theme }) => theme.colors.primary};
  border-radius: 16px;
  animation: toast-enter 0.6s ease;
  padding: 20px;
  margin-top: 15px;
  border: 1px solid ${({ theme }) => theme.colors.error};

  @keyframes toast-enter {
    from {
      transform: translateX(120%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;

export const ToastContent = styled.span`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.primaryText};
`;

export const ErrorIcon = styled(BiErrorCircle)`
  color: ${({ theme }) => theme.colors.error};
  margin-right: 10px;
`;

export const CloseIcon = styled(IoClose)`
  transition: 0.2s ease;
  cursor: pointer;
  position: absolute;
  top: 17px;
  right: 20px;
  color: ${({ theme }) => theme.colors.gray};

  &:hover {
    color: ${({ theme }) => theme.colors.icon};
  }
`;
