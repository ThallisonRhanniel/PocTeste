import {Alert} from 'react-native';

import {useState} from 'react';

import {DocumentPickerResponse} from 'react-native-document-picker';

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
