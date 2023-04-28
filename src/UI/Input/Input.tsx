import { InputHTMLAttributes } from 'react';
import * as UI from './Input.styles';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

export const Input = ({ label, ...props }: InputProps) => {
  return (
    <UI.Wrapper>
      {label && <UI.Label>{label}</UI.Label>}
      <UI.Input {...props} />
    </UI.Wrapper>
  );
};
