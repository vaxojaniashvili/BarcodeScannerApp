import {Camera} from 'react-native-vision-camera';

export const requestCameraPermission = async (): Promise<boolean> => {
  try {
    const permission = await Camera.getCameraPermissionStatus();

    if (permission === 'granted') {
      return true;
    }

    if (permission === 'not-determined') {
      const newPermission = await Camera.requestCameraPermission();
      return newPermission === 'granted';
    }

    return false;
  } catch (error) {
    console.error('Error requesting camera permission:', error);
    return false;
  }
};
