import {useEffect, useRef, useState} from 'react';
import {Linking} from 'react-native';
import {
  Camera,
  CameraDevice,
  CameraDevices,
  useCameraDevices,
} from 'react-native-vision-camera';

const cameraController = () => {
  /**
   * State
   */

  const camera = useRef<Camera>(null);
  const devices: CameraDevices = useCameraDevices('wide-angle-camera');
  const device: CameraDevice | undefined = devices.back;

  const [showCamera, setShowCamera] = useState(false);
  const [imageSource, setImageSource] = useState('');

  /**
   * Callback
   * useCallback is used to prevent unnecessary re-renders
   */

  const capturephoto = async () => {
    if (camera.current !== null) {
      const photo = await camera.current.takePhoto({});
      setImageSource(photo.path);
      setShowCamera(false);
      console.log(photo.path);
    }
  };

  /**
   * Effects
   */

  useEffect(() => {
    async function getPermission() {
      const newCameraPermission = await Camera.requestCameraPermission();
      // const newMicrophonePermission = await Camera.requestMicrophonePermission();
      console.log(`Camera permission status: ${newCameraPermission}`);
      if (newCameraPermission === 'denied') await Linking.openSettings();
    }
    getPermission();
  }, []);
  // Sem nada apos virgula, executa sempre que a tela é renderizada ou quando tiro foto
  //[] Isso signifca que só é executado uma vez

  /**
   * Binding with the view
   */
  return {camera, device, capturephoto, setShowCamera, setImageSource};
};

export default cameraController;
