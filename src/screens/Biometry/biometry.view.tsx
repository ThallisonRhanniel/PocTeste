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
} from 'react-native';
import NetInfo, {NetInfoState} from '@react-native-community/netinfo';
import {useEffect, useState} from 'react';
import Geolocation, {GeoPosition} from 'react-native-geolocation-service';
import DocumentPicker, {
  types,
  DocumentPickerResponse,
} from 'react-native-document-picker';

import LocalAuthentication from 'rn-local-authentication';
import {IsPermissionGrantedForBiometry} from '../../util/requestPermissionAndroid';
import KeepAwake from '@sayem314/react-native-keep-awake';
import KeepAwakeExample from '../../components/KeepAwake/keepAwake';

const BiometryView = ({navigation}: any) => {
  const [fileResponse, setFileResponse] = useState<DocumentPickerResponse[]>(
    [],
  );

  return (
    <>
      <Text style={{fontWeight: 'bold', color: '#0c0f0c', fontSize: 22}}>
        {' '}
        <Text style={{color: '#484e4a', textTransform: 'capitalize'}}> </Text>
        <Text style={{color: '#484e4a', textTransform: 'capitalize'}}> </Text>
      </Text>
      <KeepAwakeExample></KeepAwakeExample>
      <Button
        onPress={async () => {
          // IsPermissionGrantedForBiometry();
          handleAutchTeste();
        }}
        title="Coletar Biometria"
      />
    </>
  );
};

export default BiometryView;

const optionalConfigObject = {
  title: 'Please Authenticate', // Android
  imageColor: '#000', // Android
  imageErrorColor: '#ff0000', // Android
  sensorDescription: 'Slightly Touch sensor', // Android
  sensorErrorDescription: 'Failed', // Android
  cancelText: 'Cancel', // Android
  fallbackLabel: 'Show Passcode', // iOS (if empty, then label is hidden)
  unifiedErrors: false, // use unified error messages (default false)
  passcodeFallback: true, // iOS
};

const handleAutchTeste = () => {
  LocalAuthentication.authenticateAsync({
    reason: 'Please, authenticate!',
  }).then(response => {
    if (response.success) {
      Alert.alert('Authenticated successfully!');
    } else {
      Alert.alert('Something went wrong');
    }
  });
};
// const handleAuth = () => {
//   TouchID.isSupported().then(biometryType => {
//     if (biometryType === 'FaceID') {
//       TouchID.authenticate('', optionalConfigObject)
//         .then((success: any) => {
//           // navigation.replace("ProtectedScreen");
//         })
//         .catch((error: any) => {
//           Alert.alert('Authentication Failed', error.message);
//         });
//     } else {
//       TouchID.authenticate('', optionalConfigObject)
//         .then((success: any) => {
//           // navigation.replace("ProtectedScreen");
//         })
//         .catch((error: any) => {
//           Alert.alert('Authentication Failed', error.message);
//         });
//     }
//   });
// };
