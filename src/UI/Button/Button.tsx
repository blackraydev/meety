import { ButtonHTMLAttributes } from 'react';
import * as UI from './Button.styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  content: React.ReactNode;
};

export const Button = ({ content, ...props }: ButtonProps) => {
  return <UI.Button {...props}>{content}</UI.Button>;
};
