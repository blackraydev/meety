import styled from 'styled-components';
import { Input } from '../../../../UI';

export const RoomConfigurationWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 50px;
`;

export const RoomConfiguration = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 275px;
`;

export const NameInput = styled(Input)`
  width: 275px;
`;
