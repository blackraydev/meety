import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Button } from '../../UI';

export const Register = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  width: 300px;

  a {
    text-decoration: none;
  }
`;

export const RegisterButton = styled(Button)`
  margin-top: 20px;
  width: 100%;
  max-height: 50px;
`;

export const RegisterText = styled.span`
  transition: 0.3s ease;
  color: ${({ theme }) => theme.colors.primaryText};
`;

export const FooterWrapper = styled.div`
  display: flex;
  gap: 5px;
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
