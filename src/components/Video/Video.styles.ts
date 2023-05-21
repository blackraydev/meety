import styled, { css } from 'styled-components';
import { BsMicMuteFill } from 'react-icons/bs';
import { Loader } from '../../UI';

type DefaultVideoProps = {
  singleMode?: boolean;
  constraints?: {
    width: number;
    height: number;
  };
};

type VideoStyleProps = DefaultVideoProps & {
  mirrored: boolean;
};

export const VideoWrapper = styled.div<DefaultVideoProps>`
  transition: 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border-radius: 20px;
  overflow: hidden;

  width: 890px;
  height: 500px;

  ${({ constraints }) =>
    constraints &&
    css`
      width: ${constraints.width}px;
      height: ${constraints.height}px;
    `}

  ${({ singleMode = false }) =>
    singleMode &&
    css`
      width: 890px;
      height: 500px;
    `}
`;

export const Video = styled.video<VideoStyleProps>`
  transition: 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  transform: rotateY(${({ mirrored }) => (mirrored ? '180' : '0')}deg);
  background: ${({ theme }) => theme.colors.primary};
  z-index: 1;

  width: 890px;
  height: 500px;

  ${({ constraints }) =>
    constraints &&
    css`
      width: ${constraints.width}px;
      height: ${constraints.height}px;
    `}

  ${({ singleMode = false }) =>
    singleMode &&
    css`
      width: 890px;
      height: 500px;
    `}
`;

export const StreamLoader = styled(Loader)`
  position: absolute;
`;

export const Background = styled.div`
  transition: 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.colors.primary};
  z-index: 2;
`;

export const UserPhoto = styled.div`
  transition: 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: 200px;
  height: 200px;
  background: ${({ theme }) => theme.colors.main};
`;

export const UserName = styled.p`
  font-size: 32px;
  color: ${({ theme }) => theme.colors.primaryText};
`;

export const MicMutedIcon = styled(BsMicMuteFill)`
  position: absolute;
  right: 15px;
  bottom: 15px;
  z-index: 3;
  color: ${({ theme }) => theme.colors.icon};
`;

export const NameLabel = styled.span`
  position: absolute;
  left: 15px;
  bottom: 15px;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.primaryText};
  z-index: 3;
`;
