import { useTranslation } from 'react-i18next';
import { Button, ToggleSwitch } from '../../../../UI';
import { Video } from '../../../../components';
import { LOCAL_VIDEO } from '../../../../constants/localVideo';
import { useRoom } from '../';
import * as UI from './RoomConfiguration.styles';

export const RoomConfiguration = () => {
  const { t } = useTranslation();

  const {
    provideMediaRef,
    toggleCamera,
    toggleMic,
    isClientVideoEnabled,
    isClientAudioEnabled,
    onJoinRoom,
    name,
    setName
  } = useRoom();

  const clientId = LOCAL_VIDEO;

  return (
    <UI.RoomConfigurationWrapper>
      <Video
        key={clientId}
        ref={(instance) => provideMediaRef(clientId, instance as HTMLVideoElement)}
        videoDisabled={!isClientVideoEnabled(clientId)}
        audioDisabled={!isClientAudioEnabled(clientId)}
        loading={false}
        mirrored
        muted
      />
      <UI.RoomConfiguration>
        <UI.NameInput
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t('yourName')}
        />
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
        <Button onClick={onJoinRoom} disabled={!name}>
          {t('join')}
        </Button>
      </UI.RoomConfiguration>
    </UI.RoomConfigurationWrapper>
  );
};
