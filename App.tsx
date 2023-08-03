/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

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

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

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
  });

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
      {/* <RNCamera
        ref={camera => {
          this.camera = camera;
        }}
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
        autoFocus={RNCamera.Constants.AutoFocus.on}
        flashMode={RNCamera.Constants.FlashMode.off}
        permissionDialogTitle={'Permission to use camera'}
        permissionDialogMessage={
          'We need your permission to use your camera phone'
        }
      /> */}
      <Camera
        ref={camera}
        style={StyleSheet.absoluteFill}
        device={device}
        photo={true}
        isActive={true}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={capturephoto} style={styles.capture}>
          <Text style={styles.buttonText}> SNAP4 </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

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

// const styles = StyleSheet.create({
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   highlight: {
//     fontWeight: '700',
//   },
// });

export default App;
