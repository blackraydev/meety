import { ButtonHTMLAttributes, ReactNode } from 'react';
import { DefaultProps } from '../../types';
import * as UI from './Button.styles';
import { Tooltip } from '..';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  DefaultProps & {
    tooltipContent?: ReactNode;
  };

export const Button = ({ children, tooltipContent, ...props }: ButtonProps) => {
  return tooltipContent ? (
    <Tooltip content={tooltipContent}>
      <UI.Button {...props}>{children}</UI.Button>
    </Tooltip>
  ) : (
    <UI.Button {...props}>{children}</UI.Button>
  );
};
