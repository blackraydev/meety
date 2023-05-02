import { useState } from 'react';
import * as UI from './Select.styles';

type SelectOption = {
  value: string;
  label: string;
};

type SelectProps = {
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
  placeholder?: string;
};

export const Select = ({ options, value, onChange, placeholder }: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (selectedValue: string) => {
    setIsOpen(false);
    onChange(selectedValue);
  };

  const handleSelectBlur = () => {
    setIsOpen(false);
  };

  return (
    <UI.Select onBlur={handleSelectBlur} isOpen={isOpen}>
      <UI.SelectButton onClick={() => setIsOpen(!isOpen)}>
        {options.find((option) => option.value === value)?.label || placeholder}
        <UI.ChevronIcon />
      </UI.SelectButton>
      <UI.OptionsList>
        {options.map((option) => (
          <UI.OptionItem key={option.value} onClick={() => handleOptionClick(option.value)}>
            {option.label}
          </UI.OptionItem>
        ))}
      </UI.OptionsList>
    </UI.Select>
  );
};
