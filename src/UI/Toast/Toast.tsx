import { ToastType } from './ToastContext';
import * as UI from './Toast.styles';

type ToastProps = {
  toast: ToastType;
  deleteToast: (id: string) => void;
};

export const Toast = ({ toast, deleteToast }: ToastProps) => {
  return (
    <UI.Toast>
      <UI.ErrorIcon size={24} />
      <UI.ToastContent>{toast.content}</UI.ToastContent>
      <UI.CloseIcon onClick={() => deleteToast(String(toast.id))} size={24} />
    </UI.Toast>
  );
};
