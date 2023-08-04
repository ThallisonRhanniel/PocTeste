import React, {useEffect, useRef, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Button,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
  Alert,
  Linking,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {RNCamera} from 'react-native-camera';
import {PureComponent} from 'react';
import {log} from 'console';
import {
  Camera,
  CameraDevice,
  CameraDevices,
  useCameraDevices,
} from 'react-native-vision-camera';

const CameraView = () => {
  const camera = useRef<Camera>(null);
  const devices: CameraDevices = useCameraDevices('wide-angle-camera');
  const device: CameraDevice | undefined = devices.back;

  const [showCamera, setShowCamera] = useState(false);
  const [imageSource, setImageSource] = useState('');

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

  const capturephoto = async () => {
    if (camera.current !== null) {
      const photo = await camera.current.takePhoto({});
      setImageSource(photo.path);
      setShowCamera(false);
      console.log(photo.path);
    }
  };

  if (device == null) {
    return <Text>Camera not available</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera
        ref={camera}
        style={styles.container}
        device={device}
        photo={true}
        isActive={true}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={capturephoto} style={styles.capture}>
          <Text style={styles.buttonText}> Tirar foto </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  buttonContainer: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
  buttonText: {
    fontSize: 14,
  },
});

export default CameraView;
