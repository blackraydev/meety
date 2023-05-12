import { useTranslation } from 'react-i18next';
import { Button, ToggleSwitch } from '../../../../UI';
import { Video } from '../../../../components';
import { LOCAL_VIDEO } from '../../../../constants/localVideo';
import { useRoom } from '../';
import * as UI from './RoomConfiguration.styles';

export const RoomConfiguration = () => {
  const { t } = useTranslation();
  const clientId = LOCAL_VIDEO;

  const {
    provideMediaRef,
    toggleCamera,
    toggleMic,
    isClientVideoEnabled,
    isClientAudioEnabled,
    onJoinRoom,
    clientName,
    setClientName,
  } = useRoom();

  return (
    <UI.RoomConfigurationWrapper>
      <Video
        key={clientId}
        ref={(instance) => provideMediaRef(clientId, instance as HTMLVideoElement)}
        videoDisabled={!isClientVideoEnabled(clientId)}
        audioDisabled={!isClientAudioEnabled(clientId)}
        name={t('you')}
        loading={false}
        mirrored
        muted
      />
      <UI.RoomConfiguration>
        <UI.NameInput
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
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
        <Button onClick={onJoinRoom} disabled={!clientName}>
          {t('join')}
        </Button>
      </UI.RoomConfiguration>
    </UI.RoomConfigurationWrapper>
  );
};
