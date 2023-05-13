import { ReactNode } from 'react';
import { DefaultProps } from '../../types';
import * as UI from './Drawer.styles';

type DrawerProps = DefaultProps & {
  active: boolean;
  title: string;
  onClose: () => void;
  footer?: ReactNode;
  className?: string;
};

export const Drawer = ({ active, title, onClose, footer, children, className }: DrawerProps) => {
  return (
    <UI.Drawer active={active} className={className}>
      <UI.DrawerHeader>
        <UI.DrawerTitle>{title}</UI.DrawerTitle>
        <UI.CloseIcon onClick={onClose} size={32} />
      </UI.DrawerHeader>
      <UI.DrawerContent>{children}</UI.DrawerContent>
      {footer && <UI.DrawerFooter>{footer}</UI.DrawerFooter>}
    </UI.Drawer>
  );
};
