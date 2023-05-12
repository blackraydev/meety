import { useCallback, useContext, useState, createContext } from 'react';
import { v4 } from 'uuid';
import { DefaultProps } from '../../../types';
import { Toast } from '..';
import * as UI from './ToastContext.styles';

export type ToastType = {
  content: string;
  id?: string;
};

type ToastContextType = {
  addToast: (toast: ToastType) => void;
};

export const ToastContext = createContext<ToastContextType>({} as ToastContextType);

export const useToast = () => useContext(ToastContext);

export function ToastContextProvider({ children }: DefaultProps) {
  const [toasts, setToasts] = useState<ToastType[]>([]);

  const addToast = useCallback(
    (toast: ToastType) => {
      const newToast = {
        ...toast,
        id: v4(),
      };

      setToasts((toasts) => [...toasts, newToast]);
      setTimeout(() => setToasts((toasts) => toasts.slice(1)), 4000);
    },
    [toasts],
  );

  const deleteToast = useCallback(
    (id: string) => {
      const targetToastIndex = toasts.findIndex((toast) => toast.id === id);

      setToasts((prev) => {
        const filteredToasts = prev.filter((_, index) => index !== targetToastIndex);
        return filteredToasts;
      });
    },
    [toasts, setToasts],
  );

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <UI.ToastsWrapper>
        {toasts.map((toast) => (
          <Toast toast={toast} deleteToast={deleteToast} key={toast.id} />
        ))}
      </UI.ToastsWrapper>
    </ToastContext.Provider>
  );
}
