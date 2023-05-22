import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const Label = styled.label`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.primaryText};
  margin-bottom: 10px;
  margin-left: 10px;
`;

export const Input = styled.input`
  transition: 0.3s ease;
  height: 48px;
  font-size: 16px;
  border-radius: 15px;
  padding: 0 15px;
  color: ${({ theme }) => theme.colors.primaryText};
  background: ${({ theme }) => theme.colors.primary};

  &::placeholder {
    color: ${({ theme }) => theme.colors.placeholderText};
  }
`;
