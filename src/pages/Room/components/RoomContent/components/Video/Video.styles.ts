import styled from 'styled-components';
import { Loader } from '../../../../../../UI';

export const Video = styled.video`
  transition: 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  width: 500px;
  height: 500px;
  transform: rotateY(180deg);
  background: ${({ theme }) => theme.colors.primary};
`;

export const VideoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

export const StreamLoader = styled(Loader)`
  position: absolute;
`;
