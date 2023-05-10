import { ChangeEvent, useState } from 'react';
import * as UI from './ToggleSwitch.styles';

type ToggleSwitchProps = {
  label: {
    checked: string;
    unchecked: string;
  };
  onChange?: () => void;
  className?: string;
};

export const ToggleSwitch = ({ label, onChange, className }: ToggleSwitchProps) => {
  const [checked, setChecked] = useState(false);
  const toggleSwitchLabel = checked ? label.checked : label.unchecked;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);

    if (onChange) {
      onChange();
    }
  };

  return (
    <UI.ToggleSwitch className={className}>
      <UI.Label>{toggleSwitchLabel}</UI.Label>
      <UI.Toggler checked={checked} type="checkbox" onChange={handleChange} />
      <UI.Switcher checked={checked} />
    </UI.ToggleSwitch>
  );
};
