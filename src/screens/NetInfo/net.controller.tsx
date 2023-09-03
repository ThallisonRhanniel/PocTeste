import * as React from 'react';
import {
  Button,
  Text,
  StatusBar,
  TouchableOpacity,
  View,
  StyleSheet,
  Alert,
} from 'react-native';
import NetInfo, {NetInfoState} from '@react-native-community/netinfo';
import {useEffect, useState} from 'react';

// Subscribe;
// const unsubscribe = NetInfo.addEventListener(state => {
//   console.log('Connection type2', state.type);
//   console.log('Is connected?2', state.isConnected);
// });

// Unsubscribe
// unsubscribe();

//TODO Fazer um extends
interface NetInfoStateProps {
  details: {
    ipAddress: string;
    isConnectionExpensive: boolean;
    subnet: string;
  };
  isConnected: boolean;
  isInternetReachable: boolean;
  type: string;
}

type Tomato = NetInfoState & {
  isConnected: boolean;
  details: {
    ipAddress: string;
    isConnectionExpensive: boolean;
    subnet: string;
  };
};

const netController = () => {
  /**
   * State
   */
  const [netStatus, setNetStatus] = useState<Tomato>();
  const [netStatusDetails, setnetStatusDetails] = useState<any>();
  /**
   * Callback
   * useCallback is used to prevent unnecessary re-renders
   */

  /**
   * Effects
   */

  useEffect(() => {
    NetInfo.fetch().then(state => {
      setNetStatus(state as Tomato);
      setnetStatusDetails(state?.details);
    });
  }, [netStatus]);

  /**
   * Binding with the view
   */
  return {netStatus};
};

export default netController;
