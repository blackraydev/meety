import { InputHTMLAttributes, forwardRef } from 'react';
import * as UI from './Input.styles';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(({ label, ...props }, ref) => {
  return (
    <UI.Wrapper>
      {label && <UI.Label>{label}</UI.Label>}
      <UI.Input ref={ref} {...props} />
    </UI.Wrapper>
  );
});
