import { useTranslation } from 'react-i18next';
import { Modal } from '../../UI';
import * as UI from './PreferencesModal.styles';

type PreferencesModalProps = {
  onClose: () => void;
  audioTracks: MediaStreamTrack[];
  videoTracks: MediaStreamTrack[];
};

export const PreferencesModal = ({ onClose, audioTracks, videoTracks }: PreferencesModalProps) => {
  const { t } = useTranslation();

  return (
    <Modal onClose={onClose} title={t('settings')}>
      <UI.DeviceSelect
        value={audioTracks[0]?.label || ''}
        label={t('microphone')}
        options={audioTracks.map((track) => ({
          value: track.label,
          label: track.label,
        }))}
        onChange={() => alert('Microphone changed')}
      />
      <UI.DeviceSelect
        value={videoTracks[0]?.label || ''}
        label={t('camera')}
        options={videoTracks.map((track) => ({
          value: track.label,
          label: track.label,
        }))}
        onChange={() => alert('Camera changed')}
      />
    </Modal>
  );
};
