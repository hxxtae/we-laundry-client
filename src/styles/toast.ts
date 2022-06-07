import { toast, ToastOptions } from 'react-toastify';

const toastOptions: ToastOptions = {
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: false,
  pauseOnFocusLoss: false,
  draggable: true,
  theme: 'colored',
};

export const toastStyle = {
  success: (message: string) => {
    toast.success(message, {
      ...toastOptions,
      position: "top-center",
    });
  },
  error: (message: string) => {
    toast.error(message, {
      ...toastOptions,
      position: "top-center",
    });
  },
  info: (message: string) => {
    toast.info(message, {
      ...toastOptions,
      position: "top-right",
    });
  },
  infoSecondary: (message: string) => {
    toast(message, {
      ...toastOptions,
      position: "top-center",
    });
  }
};


