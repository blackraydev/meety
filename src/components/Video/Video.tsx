import { forwardRef } from 'react';
import * as UI from './Video.styles';

type VideoProps = {
  muted: boolean;
  name: string;
  mirrored: boolean;
  videoDisabled: boolean;
  audioDisabled: boolean;
  screenShareDisabled: boolean;
  loading?: boolean;
  className?: string;
};

export const Video = forwardRef<HTMLVideoElement, VideoProps>(
  (
    {
      loading,
      name,
      mirrored,
      muted,
      videoDisabled,
      audioDisabled,
      screenShareDisabled,
      className,
    },
    ref,
  ) => {
    return (
      <UI.VideoWrapper className={className}>
        {loading && <UI.StreamLoader />}
        {videoDisabled && screenShareDisabled && <UI.Background />}
        {audioDisabled && <UI.MicMutedIcon size={20} />}
        <UI.NameLabel>{name}</UI.NameLabel>
        <UI.Video ref={ref} mirrored={mirrored} muted={muted} autoPlay />
      </UI.VideoWrapper>
    );
  },
);
