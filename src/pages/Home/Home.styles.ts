import styled from 'styled-components';
import { Link } from 'react-router-dom';
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
  transition: 0.3s ease;
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
`;

export const AuthWrapper = styled.div`
  display: flex;
  gap: 8px;
  color: ${({ theme }) => theme.colors.primaryText};
  margin-top: 10px;
`;

export const AuthLink = styled(Link)`
  transition: 0.3s ease;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.gray};

  &:hover {
    color: ${({ theme }) => theme.colors.primaryText};
  }
`;
