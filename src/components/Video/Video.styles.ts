import styled from 'styled-components';
import { BsMicMuteFill } from 'react-icons/bs';
import { Loader } from '../../UI';

type VideoStyleProps = {
  mirrored: boolean;
};

export const Video = styled.video<VideoStyleProps>`
  transition: 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  width: 500px;
  height: 500px;
  transform: rotateY(${({ mirrored }) => (mirrored ? '180' : '0')}deg);
  background: ${({ theme }) => theme.colors.primary};
  z-index: 1;
`;

export const VideoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border-radius: 20px;
  overflow: hidden;
`;

export const StreamLoader = styled(Loader)`
  position: absolute;
`;

export const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.colors.primary};
  z-index: 2;
`;

export const MicMutedIcon = styled(BsMicMuteFill)`
  position: absolute;
  right: 20px;
  bottom: 20px;
  z-index: 3;
  color: ${({ theme }) => theme.colors.icon};
`;

export const NameLabel = styled.span`
  position: absolute;
  left: 20px;
  bottom: 20px;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.primaryText};
  z-index: 3;
`;
