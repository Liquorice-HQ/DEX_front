import { toast } from 'react-toastify';

const AUTOCLOSE_DEFAULT = 2500;
let loadingToastId: any = null;

export const notify = (message: any) =>
  toast(message, {
    type: toast.TYPE.DEFAULT,
    autoClose: AUTOCLOSE_DEFAULT,
    className: 'text-left',
  });
export const notifyError = (message: any) =>
  toast(message, {
    type: toast.TYPE.ERROR,
    autoClose: AUTOCLOSE_DEFAULT,
    className: 'text-left',
  });
export const notifyWarning = (message: any) =>
  toast(message, {
    type: toast.TYPE.WARNING,
    autoClose: AUTOCLOSE_DEFAULT,
    className: 'text-left',
  });
export const notifySuccess = (message: any) =>
  toast(message, {
    type: toast.TYPE.SUCCESS,
    autoClose: AUTOCLOSE_DEFAULT,
    className: 'text-left',
  });
export const notifyInformation = (message: any) =>
  toast(message, {
    type: toast.TYPE.INFO,
    autoClose: AUTOCLOSE_DEFAULT,
    className: 'text-left',
  });
export const notifyPromise = (
  promise: any,
  pendingMessage: any,
  successMessage: any,
  errorMessage: any
) =>
  toast.promise(
    promise,
    {
      pending: pendingMessage,
      success: successMessage,
      error: errorMessage,
    },
    {
      className: 'text-left',
    }
  );
export const startLoadingNotification = (
  message: any,
  dismissAllBefore = false
) => {
  if (dismissAllBefore) {
    toast.dismiss();
  }
  if (!loadingToastId) {
    loadingToastId = toast.loading(message, {
      className: 'text-left',
      isLoading: true,
    });
  }
};

export const updateLoadingNotification = (message: any, type: any) => {
  if (loadingToastId) {
    toast.update(loadingToastId, {
      render: message,
      type: type,
    });
  }
};
export const updateAndCloseLoadingNotification = (message: any, type: any) => {
  if (loadingToastId) {
    toast.update(loadingToastId, {
      render: message,
      type: type,
      isLoading: false,
      autoClose: AUTOCLOSE_DEFAULT,
    });
    loadingToastId = null;
  }
};
export const closeLoadingNotification = () => {
  if (loadingToastId) {
    toast.dismiss(loadingToastId);
  }
  loadingToastId = null;
};
export const clearAllNotifications = () => {
  toast.dismiss();
};
