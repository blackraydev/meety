import styled from 'styled-components';
import { IoClose } from 'react-icons/io5';

type DrawerStyleProps = {
  active: boolean;
};

export const Drawer = styled.div<DrawerStyleProps>`
  display: flex;
  transition: 0.3s ease;
  position: absolute;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.primary};
  width: 400px;
  transform: ${({ active }) => `translate(${active ? 0 : 420}px)`};
  opacity: ${({ active }) => (active ? 1 : 0)};
  height: calc(100% - 200px);
  overflow: hidden;
  right: 0;
  top: 0;
  padding: 20px;
  margin-top: 100px;
  margin-right: 20px;
  border-radius: 20px;
`;

export const DrawerHeader = styled.div`
  display: flex;
  jusfity-content: space-between;
  margin-bottom: 30px;
`;

export const DrawerTitle = styled.p`
  font-size: 18px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.primaryText};
`;

export const CloseIcon = styled(IoClose)`
  transition: 0.2s ease;
  cursor: pointer;
  position: absolute;
  top: 16px;
  right: 13px;
  color: ${({ theme }) => theme.colors.gray};

  &:hover {
    color: ${({ theme }) => theme.colors.icon};
  }
`;

export const DrawerContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: scroll;
  width: 100%;
  height: 100%;
`;

export const DrawerFooter = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
  margin-top: 20px;
`;
