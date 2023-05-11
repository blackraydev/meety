import { ButtonHTMLAttributes, ReactNode } from 'react';
import { DefaultProps } from '../../types';
import { Tooltip } from '..';
import * as UI from './Button.styles';

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
