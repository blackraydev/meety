import { forwardRef } from 'react';
import * as UI from './Video.styles';

type VideoProps = {
  muted: boolean;
  mirrored: boolean;
  loading?: boolean;
  videoDisabled?: boolean;
  audioDisabled?: boolean;
  className?: string;
};

export const Video = forwardRef<HTMLVideoElement, VideoProps>(
  ({ loading, mirrored, muted, videoDisabled, audioDisabled, className }, ref) => {
    return (
      <UI.VideoWrapper className={className}>
        {loading && <UI.StreamLoader />}
        {videoDisabled && <UI.Background />}
        {audioDisabled && <UI.MicMutedIcon size={20} />}
        <UI.Video ref={ref} mirrored={mirrored} muted={muted} autoPlay />
      </UI.VideoWrapper>
    );
  },
);
