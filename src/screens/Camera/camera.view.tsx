import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

import {Camera} from 'react-native-vision-camera';
import cameraController from './camera.controller';

const CameraView = ({navigation}: any) => {
  const {camera, device, setImageSource, setShowCamera} = cameraController();

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
