import styled from 'styled-components';

export const Room = styled.div`
  display: flex;
  flex-direction: column;
  align-items: space-between;
  justify-content: space-between;
  width: 100%;
  height: 100vh;
`;

export const RoomContent = styled.div`
  margin-top: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
  padding: 0 20px;
`;

export const Video = styled.video`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  width: 500px;
  height: 500px;
  transform: rotateY(180deg);
  background: ${({ theme }) => theme.colors.primary};
`;
