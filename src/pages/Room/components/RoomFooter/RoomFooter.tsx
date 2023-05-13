import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ImPhoneHangUp } from 'react-icons/im';
import { BsGearFill, BsMicFill, BsMicMuteFill, BsPeopleFill } from 'react-icons/bs';
import { IoVideocam, IoVideocamOff, IoChatboxEllipses } from 'react-icons/io5';
import { MdOutlineScreenShare, MdOutlineStopScreenShare } from 'react-icons/md';
import { PreferencesModal } from '../../../../components';
import { useRoom } from '../RoomContext';
import * as UI from './RoomFooter.styles';

const iconProps = {
  size: 20,
};

export const RoomFooter = () => {
  const { t } = useTranslation();
  const [settingsOpen, setSettingsOpen] = useState(false);

  const {
    cameraActive,
    micActive,
    screenShareActive,
    chatActive,
    participantsActive,
    toggleCamera,
    toggleMic,
    toggleScreenShare,
    toggleChat,
    toggleParticipants,
    leaveRoom,
    getAudioTracks,
    getVideoTracks,
  } = useRoom();

  const audioTracks = useMemo(() => getAudioTracks() || [], [getAudioTracks]);
  const videoTracks = useMemo(() => getVideoTracks() || [], [getVideoTracks]);

  const handleChatToggle = () => {
    toggleChat();

    if (participantsActive) {
      toggleParticipants();
    }
  };

  const handleParticipantsToggle = () => {
    toggleParticipants();

    if (chatActive) {
      toggleChat();
    }
  };

  return (
    <UI.RoomFooter>
      <UI.ActionsWrapper />
      <UI.ActionsWrapper>
        <UI.ActionButton
          onClick={toggleScreenShare}
          actionDisabled={!screenShareActive}
          tooltipContent={t('toggleScreenShare', {
            toggle: screenShareActive ? t('stop') : t('start'),
          })}
        >
          {(screenShareActive ? MdOutlineScreenShare : MdOutlineStopScreenShare)()}
        </UI.ActionButton>
        <UI.ActionButton
          onClick={toggleMic}
          actionDisabled={!micActive}
          tooltipContent={t('toggleMicrophone', {
            toggle: micActive ? t('turnOff') : t('turnOn'),
          })}
        >
          {(micActive ? BsMicFill : BsMicMuteFill)({ ...iconProps })}
        </UI.ActionButton>
        <UI.DeclineButton onClick={leaveRoom} tooltipContent={t('leaveRoom')}>
          {ImPhoneHangUp({ ...iconProps, size: 26 })}
        </UI.DeclineButton>
        <UI.ActionButton
          onClick={toggleCamera}
          actionDisabled={!cameraActive}
          tooltipContent={t('toggleCamera', {
            toggle: cameraActive ? t('turnOff') : t('turnOn'),
          })}
        >
          {(cameraActive ? IoVideocam : IoVideocamOff)({ ...iconProps })}
        </UI.ActionButton>
        <UI.ActionButton onClick={() => setSettingsOpen(true)} tooltipContent={t('openSettings')}>
          {BsGearFill({ ...iconProps })}
        </UI.ActionButton>
      </UI.ActionsWrapper>
      <UI.ActionsWrapper>
        <UI.ActionButton
          onClick={handleChatToggle}
          tooltipContent={t('toggleChat', {
            toggle: chatActive ? t('hide') : t('show'),
          })}
        >
          {IoChatboxEllipses({ ...iconProps })}
        </UI.ActionButton>
        <UI.ActionButton
          onClick={handleParticipantsToggle}
          tooltipContent={t('toggleParticipants', {
            toggle: participantsActive ? t('hide') : t('show'),
          })}
        >
          {BsPeopleFill({ ...iconProps })}
        </UI.ActionButton>
      </UI.ActionsWrapper>
      {settingsOpen && (
        <PreferencesModal
          onClose={() => setSettingsOpen(false)}
          audioTracks={audioTracks}
          videoTracks={videoTracks}
        />
      )}
    </UI.RoomFooter>
  );
};
