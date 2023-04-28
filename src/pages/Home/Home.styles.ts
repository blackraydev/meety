import styled from 'styled-components';
import { Button, Input } from '../../UI';

export const Home = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;

  a {
    text-decoration: none;
  }
`;

export const Text = styled.p`
  font-size: 20px;
  color: ${({ theme }) => theme.colors.primaryText};
`;

export const JoinWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 16px;
`;

export const JoinInput = styled(Input)`
  width: 300px;
`;

export const JoinButton = styled(Button)`
  height: 48px;
  width: 100%;

  &:disabled {
    cursor: default;
    background: ${({ theme }) => theme.colors.primaryDisabled};
    color: ${({ theme }) => theme.colors.gray};
  }
`;
