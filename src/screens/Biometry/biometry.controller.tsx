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
import {IsPermissionGrantedForBiometry} from '../../util/resquestPermission';

const biometryController = () => {
  /**
   * State
   */
  const [fileResponse, setFileResponse] = useState<DocumentPickerResponse[]>(
    [],
  );

  /**
   * Callback
   * useCallback is used to prevent unnecessary re-renders
   */

  const canHandleAutch = async () => {
    if (await IsPermissionGrantedForBiometry()) {
      handleAutchTeste();
    }
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

  /**
   * Effects
   */
  /**
   * Binding with the view
   */
  return {canHandleAutch};
};

export default biometryController;
