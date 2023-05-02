import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ImPhoneHangUp } from 'react-icons/im';
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi';
import { BsGearFill, BsMicFill, BsMicMuteFill } from 'react-icons/bs';
import { IoVideocam, IoVideocamOff } from 'react-icons/io5';
import { PagesRoutes } from '../../../constants';
import * as UI from './RoomFooter.styles';

const iconProps = {
  size: 20,
};

export const RoomFooter = () => {
  const navigate = useNavigate();
  const [micDisabled, setMicDisabled] = useState(true);
  const [videoDisabled, setVideoDisabled] = useState(true);
  const [volumeDisabled, setVolumeDisabled] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const handleMicToggle = () => setMicDisabled((prev) => !prev);

  const handleVideoToggle = () => setVideoDisabled((prev) => !prev);

  const handleVolumeToggle = () => setVolumeDisabled((prev) => !prev);

  const handleSettingsToggle = () => setSettingsOpen((prev) => !prev);

  const handleLeaveRoom = () => {
    navigate(PagesRoutes.Home);
  };

  return (
    <UI.RoomFooter>
      <UI.ActionButton onClick={handleVolumeToggle} actionDisabled={volumeDisabled}>
        {(volumeDisabled ? HiVolumeOff : HiVolumeUp)({ ...iconProps })}
      </UI.ActionButton>
      <UI.ActionButton onClick={handleMicToggle} actionDisabled={micDisabled}>
        {(micDisabled ? BsMicMuteFill : BsMicFill)({ ...iconProps })}
      </UI.ActionButton>
      <UI.DeclineButton onClick={handleLeaveRoom}>
        {ImPhoneHangUp({ ...iconProps, size: 26 })}
      </UI.DeclineButton>
      <UI.ActionButton onClick={handleVideoToggle} actionDisabled={videoDisabled}>
        {(videoDisabled ? IoVideocamOff : IoVideocam)({ ...iconProps })}
      </UI.ActionButton>
      <UI.ActionButton onClick={handleSettingsToggle}>
        {BsGearFill({ ...iconProps })}
      </UI.ActionButton>
    </UI.RoomFooter>
  );
};
