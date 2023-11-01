// ToastWrapper.js
import Toast from 'react-native-toast-message';

export const showToast = (type, text1, text2 = '') => {
  Toast.show({
    type: type, // can be 'success', 'error', 'info'
    text1: text1,
    text2: text2,
    visibilityTime: 3000, // 3 seconds
    autoHide: true,
    topOffset: 60,
    bottomOffset: 40,
    // ... any other Toast options you'd like to include
  });
};

export default Toast;
