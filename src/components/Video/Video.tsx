import { forwardRef } from 'react';
import * as UI from './Video.styles';

type VideoProps = {
  muted: boolean;
  name: string;
  mirrored: boolean;
  loading?: boolean;
  videoDisabled?: boolean;
  audioDisabled?: boolean;
  className?: string;
};

export const Video = forwardRef<HTMLVideoElement, VideoProps>(
  ({ loading, name, mirrored, muted, videoDisabled, audioDisabled, className }, ref) => {
    return (
      <UI.VideoWrapper className={className}>
        {loading && <UI.StreamLoader />}
        {videoDisabled && <UI.Background />}
        {audioDisabled && <UI.MicMutedIcon size={20} />}
        <UI.NameLabel>{name}</UI.NameLabel>
        <UI.Video ref={ref} mirrored={mirrored} muted={muted} autoPlay />
      </UI.VideoWrapper>
    );
  },
);
