import styled from 'styled-components';
import { Video } from './components/Video';

type ScreenShareVideoStyleProps = {
  screenShareActive: boolean;
};

export const RoomContent = styled.div`
  margin-top: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
  padding: 0 20px;
`;

export const ScreenShareVideo = styled(Video)<ScreenShareVideoStyleProps>`
  transform: rotate(0);
  display: ${({ screenShareActive }) => (screenShareActive ? 'flex' : 'none')};
`;
