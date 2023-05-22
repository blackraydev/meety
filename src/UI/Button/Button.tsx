import { ButtonHTMLAttributes, ReactNode } from 'react';
import { DefaultProps } from '../../types';
import { Loader, Tooltip } from '..';
import * as UI from './Button.styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  DefaultProps & {
    isLoading?: boolean;
    tooltipContent?: ReactNode;
  };

export const Button = ({
  children,
  disabled,
  isLoading,
  tooltipContent,
  ...props
}: ButtonProps) => {
  return tooltipContent ? (
    <Tooltip content={tooltipContent}>
      <UI.Button {...props}>{children}</UI.Button>
    </Tooltip>
  ) : (
    <UI.Button disabled={disabled || isLoading} {...props}>
      {isLoading ? <Loader /> : children}
    </UI.Button>
  );
};
