import { useCallback } from 'react';
import { toast } from 'react-toastify';

export default function useToast() {
  const sendToast = useCallback((message, success = true) => {
    toast(message, {
      type: success ? toast.TYPE.SUCCESS : toast.TYPE.ERROR,
    });
  }, []);

  return {
    sendToast,
  };
}
