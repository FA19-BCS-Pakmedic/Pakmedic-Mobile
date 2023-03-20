import {useToast} from 'react-native-toast-notifications';

export const useCustomToast = () => {
  const toast = useToast();

  const showToast = (
    message,
    type = 'success',
    duration = 4000,
    position = 'top',
    animation = 'slide-in | zoom-in',
  ) => {
    toast.show(message, {
      type,
      duration: duration,
      offset: 30,
      placement: position,
      animationType: animation,
    });
  };

  return {
    showToast,
  };
};
