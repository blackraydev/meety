import { ButtonHTMLAttributes } from 'react';
import { DefaultProps } from '../../types';
import * as UI from './Button.styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & DefaultProps;

export const Button = ({ children, ...props }: ButtonProps) => {
  return <UI.Button {...props}>{children}</UI.Button>;
};
