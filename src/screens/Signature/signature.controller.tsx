import * as React from 'react';
import {
  Button,
  Text,
  StatusBar,
  TouchableOpacity,
  View,
  StyleSheet,
  Alert,
  PermissionsAndroid,
  Platform,
  ToastAndroid,
  Linking,
  SafeAreaView,
  TextInput,
  Image,
  ScrollView,
} from 'react-native';
import NetInfo, {NetInfoState} from '@react-native-community/netinfo';
import Geolocation, {GeoPosition} from 'react-native-geolocation-service';
import DocumentPicker, {
  types,
  DocumentPickerResponse,
} from 'react-native-document-picker';
import RNFetchBlob from 'rn-fetch-blob';
import SignatureScreen from 'react-native-signature-canvas';
import {useRef, useState} from 'react';

const signatureController = () => {
  /**
   * State
   */
  const [signature, setSign] = useState<any | null>(null);
  const [colorText, setPenColor] = useState('');
  const ref = useRef<any | null>();
  /**
   * Callback
   * useCallback is used to prevent unnecessary re-renders
   */

  // Called after ref.current.readSignature() reads a non-empty base64 string
  const handleOK = (signature: any) => {
    console.log(signature);
    setSign(signature);
    console.log(colorText);
  };

  const handleEmpty = () => {
    Alert.alert('Kindly Affix your Signature!');
  };

  const handleClear = () => {
    console.log('clear success!');
  };

  const handleColorChange = () => {
    ref.current.changePenColor(colorText);
  };
  const handleUndo = () => {
    ref.current.undo();
  };
  const handleRedo = () => {
    ref.current.redo();
  };

  const handleSave = async () => {
    console.log('Aloo');
    if (Platform.OS === 'android') {
      var isReadGranted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );
      console.log(isReadGranted);
      if (isReadGranted === PermissionsAndroid.RESULTS.GRANTED) {
        const dirs = RNFetchBlob.fs.dirs;
        console.log(dirs);
        var image_data = signature.split('data:image/png;base64,');
        const filePath =
          dirs.DownloadDir +
          '/' +
          'signture' +
          new Date().getMilliseconds() +
          '.png';
        RNFetchBlob.fs
          .writeFile(filePath, image_data[1], 'base64')
          .then(() => {
            console.log('got here', filePath);
            // RNFetchBlob.ios.previewDocument('file://' + filePath);
          })
          .catch(errorMessage => {
            console.log(errorMessage);
          });
      }
    }

    if (Platform.OS === 'ios') {
      const dirs = RNFetchBlob.fs.dirs;
      console.log(dirs);
      var image_data = signature.split('data:image/png;base64,');
      const filePath =
        dirs.DocumentDir +
        '/' +
        'signature' +
        new Date().getMilliseconds() +
        '.png';
      RNFetchBlob.fs
        .writeFile(filePath, image_data[1], 'base64')
        .then(() => {
          RNFetchBlob.ios.previewDocument('file://' + filePath);
          console.log(filePath);
        })
        .catch(errorMessage => {
          console.log(errorMessage);
        });
    }
  };
  /**
   * Effects
   */

  /**
   * Binding with the view
   */
  return {
    ref,
    colorText,
    signature,
    handleClear,
    handleColorChange,
    handleEmpty,
    handleOK,
    handleRedo,
    handleSave,
    handleUndo,
  };
};

export default signatureController;
