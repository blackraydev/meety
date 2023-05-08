import styled, { css } from 'styled-components';
import { TooltipPositionType } from '.';

type TooltipStyleProps = {
  position: TooltipPositionType;
};

export const TooltipWrapper = styled.div`
  display: flex;
  position: relative;
`;

export const Tooltip = styled.div<TooltipStyleProps>`
  transition: 0.3s ease;
  position: absolute;
  border-radius: 8px;
  left: 50%;
  transform: translateX(-50%);
  padding: 8px;
  color: ${({ theme }) => theme.colors.primaryText};
  background: ${({ theme }) => theme.colors.primary};
  font-size: 14px;
  line-height: 1;
  white-space: nowrap;
  z-index: 1001;

  &::before {
    transition: 0.3s ease;
    content: '';
    left: 50%;
    border: 6px solid transparent;
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
    margin-left: -6px;
  }

  ${({ position }) => {
    return (
      (position === 'top' &&
        css`
          top: -40px;

          &::before {
            top: 100%;
            border-top-color: ${({ theme }) => theme.colors.primary};
          }
        `) ||
      (position === 'bottom' &&
        css`
          bottom: -40px;

          &::before {
            bottom: 100%;
            border-bottom-color: ${({ theme }) => theme.colors.primary};
          }
        `)
    );
  }}
`;
