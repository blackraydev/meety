import { useTranslation } from 'react-i18next';
import { useTheme } from 'styled-components';
import { BsMicFill, BsMicMuteFill } from 'react-icons/bs';
import { IoVideocam, IoVideocamOff } from 'react-icons/io5';
import { LOCAL_VIDEO } from '../../../../constants/localVideo';
import { Drawer } from '../../../../UI';
import { useRoom } from '../';
import { getNameInitials } from '../../../../lib';
import * as UI from './RoomParticipants.styles';

export const RoomParticipants = () => {
  const {
    participantsActive,
    toggleParticipants,
    getClientName,
    clients,
    clientName,
    isClientAudioEnabled,
    isClientVideoEnabled,
    micActive,
    cameraActive,
  } = useRoom();

  const theme = useTheme();
  const { t } = useTranslation();

  const getIconProps = (color: string) => {
    return {
      size: 20,
      color: color,
    };
  };

  return (
    <Drawer title={t('participants')} active={participantsActive} onClose={toggleParticipants}>
      {clients.map((clientId) => {
        const currentUser = clientId === LOCAL_VIDEO;
        const participantName = currentUser ? clientName : getClientName(clientId);

        const renderAudioStatus = () => {
          const EnabledAudio = <BsMicFill {...getIconProps(theme.colors.icon)} />;
          const DisabledAudio = <BsMicMuteFill {...getIconProps(theme.colors.gray)} />;

          if (currentUser) {
            return micActive ? EnabledAudio : DisabledAudio;
          }

          return isClientAudioEnabled(clientId) ? EnabledAudio : DisabledAudio;
        };

        const renderVideoStatus = () => {
          const EnabledVideo = <IoVideocam {...getIconProps(theme.colors.icon)} />;
          const DisabledVideo = <IoVideocamOff {...getIconProps(theme.colors.gray)} />;

          if (currentUser) {
            return cameraActive ? EnabledVideo : DisabledVideo;
          }

          return isClientVideoEnabled(clientId) ? EnabledVideo : DisabledVideo;
        };

        return (
          <UI.Participant key={clientId}>
            <UI.ParticipantPhoto>
              <UI.ParticipantPhotoLabel>
                {getNameInitials(participantName)}
              </UI.ParticipantPhotoLabel>
            </UI.ParticipantPhoto>
            <UI.ParticipantData>
              <UI.ParticipantName>
                {participantName}
                {currentUser && <UI.YouText>{t('you')}</UI.YouText>}
              </UI.ParticipantName>
              <UI.ParticipantRole>Participant</UI.ParticipantRole>
            </UI.ParticipantData>
            <UI.ParticipantMedia>
              {renderAudioStatus()}
              {renderVideoStatus()}
            </UI.ParticipantMedia>
          </UI.Participant>
        );
      })}
    </Drawer>
  );
};
