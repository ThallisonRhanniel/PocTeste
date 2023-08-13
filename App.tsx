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
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  TouchableHighlight,
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
import CameraView from './src/screens/Camera/camera.view';
import {AppNavigator} from './AppNavigator';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  // const navegarParaTelaCamera = () => {};

  return (
    // <SafeAreaView style={styles.container}>
    //   <View style={styles.container}>
    //     <TouchableOpacity onPress={this._onPressButton}>
    //       <View style={styles.button}>
    //         <Text style={styles.buttonText}>TouchableOpacity</Text>
    //       </View>
    //     </TouchableOpacity>
    //   </View>
    // </SafeAreaView>
    <AppNavigator></AppNavigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
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
  button: {
    marginBottom: 30,
    width: 260,
    alignItems: 'center',
    backgroundColor: '#2196F3',
  },
  buttonText: {
    textAlign: 'center',
    padding: 20,
    color: 'white',
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
});

export default App;
