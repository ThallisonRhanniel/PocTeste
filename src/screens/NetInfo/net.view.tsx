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

const NetView = ({navigation}: any) => {
  const [netStatus, setNetStatus] = useState<Tomato>();
  const [netStatusDetails, setnetStatusDetails] = useState<any>();

  useEffect(() => {
    NetInfo.fetch().then(state => {
      setNetStatus(state as Tomato);
      setnetStatusDetails(state?.details);
    });
  }, [netStatus]);

  console.log(netStatus);
  return (
    <>
      <Text style={{fontWeight: 'bold', color: '#0c0f0c', fontSize: 22}}>
        Tipo de Conexão:
        <Text style={{color: '#268e3e', textTransform: 'capitalize'}}>
          {' '}
          {netStatus?.type}
        </Text>
      </Text>
      <Text style={{fontWeight: 'bold', color: '#0c0f0c', fontSize: 22}}>
        Está com internet?:
        <Text style={{color: '#268e3e', textTransform: 'capitalize'}}>
          {`${netStatus?.isConnected}`}
        </Text>
      </Text>
      <Text style={{fontWeight: 'bold', color: '#0c0f0c', fontSize: 22}}>
        Meu IP:
        <Text style={{color: '#268e3e', textTransform: 'capitalize'}}>
          {netStatus?.details ? `${netStatus?.details.ipAddress}` : 'não d eu'}
        </Text>
      </Text>
      <Button
        onPress={() => {
          Alert.alert(`Está conectado:  ${netStatus?.isConnected}`);
        }}
        title="Verificar se a conexão está ativa"
        color="#050435"
      />
    </>
  );
};

export default NetView;
