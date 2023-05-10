import { useTranslation } from 'react-i18next';
import { Button, ToggleSwitch } from '../../../../UI';
import { Video } from '../../../../components';
import { LOCAL_VIDEO } from '../../../../constants/localVideo';
import { useRoom } from '../';
import * as UI from './RoomConfiguration.styles';

type RoomConfigurationProps = {
  onJoinRoom: () => void;
};

export const RoomConfiguration = ({ onJoinRoom }: RoomConfigurationProps) => {
  const {
    provideMediaRef,
    toggleCamera,
    toggleMic,
    // isClientVideoEnabled,
    // isClientAudioEnabled
  } = useRoom();
  const { t } = useTranslation();

  const clientId = LOCAL_VIDEO;

  return (
    <UI.RoomConfigurationWrapper>
      <Video
        key={clientId}
        ref={(instance) => provideMediaRef(clientId, instance as HTMLVideoElement)}
        // videoDisabled={!isClientVideoEnabled(clientId)}
        // audioDisabled={!isClientAudioEnabled(clientId)}
        videoDisabled={false}
        audioDisabled={false}
        loading={false}
        mirrored
        muted
      />
      <UI.RoomConfiguration>
        <UI.NameInput placeholder={t('yourName')} />
        <ToggleSwitch
          onChange={toggleCamera}
          label={{
            checked: t('camera', { status: t('enabled') }),
            unchecked: t('camera', { status: t('disabled') }),
          }}
        />
        <ToggleSwitch
          onChange={toggleMic}
          label={{
            checked: t('microphone', { status: t('enabled') }),
            unchecked: t('microphone', { status: t('disabled') }),
          }}
        />
        <Button onClick={onJoinRoom}>{t('join')}</Button>
      </UI.RoomConfiguration>
    </UI.RoomConfigurationWrapper>
  );
};
