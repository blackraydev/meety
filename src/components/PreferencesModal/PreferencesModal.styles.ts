import styled from 'styled-components';
import { Select } from '../../UI';

export const DeviceSelect = styled(Select)`
  button:hover {
    background: ${({ theme }) => theme.colors.secondary};
  }

  ul,
  li {
    background: ${({ theme }) => theme.colors.secondary};
  }
`;
