import { ReactNode, useRef, useState } from 'react';
import { DefaultProps } from '../../types';
import * as UI from './Tooltip.styles';

export type TooltipPositionType = 'top' | 'bottom';

type TooltipProps = DefaultProps & {
  content?: ReactNode;
  delay?: number;
  className?: string;
  position?: TooltipPositionType;
};

export const Tooltip = ({
  delay = 500,
  position = 'top',
  className,
  content,
  children,
}: TooltipProps) => {
  const [active, setActive] = useState(false);
  const timeoutRef = useRef<number>();

  const showTooltip = () => {
    timeoutRef.current = setTimeout(() => {
      setActive(true);
    }, delay);
  };

  const hideTooltip = () => {
    clearTimeout(timeoutRef.current);
    setActive(false);
  };

  return (
    <UI.TooltipWrapper className={className} onMouseEnter={showTooltip} onMouseLeave={hideTooltip}>
      {active && <UI.Tooltip position={position}>{content}</UI.Tooltip>}
      {children}
    </UI.TooltipWrapper>
  );
};
