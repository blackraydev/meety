import styled from 'styled-components';

type RoomContentStyleProps = {
  panelActive: boolean;
};

export const RoomContent = styled.div<RoomContentStyleProps>`
  transition: 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
  height: 100%;
  width: ${({ panelActive }) => `calc(100% - ${panelActive ? 420 : 0}px)`};
`;

export const VideosWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  gap: 20px;
  padding: 0 20px;
`;
