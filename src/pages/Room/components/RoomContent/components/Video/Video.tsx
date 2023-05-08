import { forwardRef } from 'react';
import * as UI from './Video.styles';

type VideoProps = {
  loading: boolean;
  className?: string;
};

export const Video = forwardRef<HTMLVideoElement, VideoProps>(({ loading, className }, ref) => {
  return (
    <UI.VideoWrapper className={className}>
      {loading && <UI.StreamLoader />}
      <UI.Video ref={ref} autoPlay />
    </UI.VideoWrapper>
  );
});
