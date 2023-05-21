import { forwardRef } from 'react';
import { getNameInitials } from '../../lib';
import { useRoom } from '../../pages/Room/components';
import * as UI from './Video.styles';

type VideoProps = {
  muted: boolean;
  mirrored: boolean;
  videoDisabled: boolean;
  audioDisabled: boolean;
  screenShareDisabled: boolean;
  capacity?: number;
  singleMode?: boolean;
  name?: string;
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
      capacity = 1,
      singleMode,
      className,
    },
    ref,
  ) => {
    const { chatActive, participantsActive } = useRoom();

    const getConstraints = () => {
      // const maxHeight = 685;

      // let height = maxHeight;
      // let width;

      // for (let i = 1; i <= capacity; i++) {
      //   if (i % 2 === 0) {
      //     height /= 1.5;
      //   }
      // }

      // width = height * (16 / 9);

      // if (chatActive || participantsActive) {
      //   width -= 420;
      //   height = width / (16 / 9);
      // }

      // return {
      //   width,
      //   height,
      // };

      if (capacity === 2 && (chatActive || participantsActive)) {
        return {
          width: 600,
          height: 600 / (16 / 9),
        };
      } else if (capacity === 2) {
        return {
          width: 811,
          height: 456,
        };
      } else {
        return {
          width: 1217,
          height: 685,
        };
      }
    };

    return (
      <UI.VideoWrapper className={className} singleMode={singleMode} constraints={getConstraints()}>
        {loading && <UI.StreamLoader />}
        {videoDisabled && screenShareDisabled && (
          <UI.Background>
            {name && (
              <UI.UserPhoto>
                <UI.UserName>{getNameInitials(name)}</UI.UserName>
              </UI.UserPhoto>
            )}
          </UI.Background>
        )}
        {audioDisabled && <UI.MicMutedIcon size={20} />}
        {name && <UI.NameLabel>{name}</UI.NameLabel>}
        <UI.Video
          ref={ref}
          mirrored={mirrored}
          muted={muted}
          singleMode={singleMode}
          constraints={getConstraints()}
          autoPlay
        />
      </UI.VideoWrapper>
    );
  },
);
