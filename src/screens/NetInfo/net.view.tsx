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

const NetView = ({navigation}: any) => {
  const [netStatus, setNetStatus] = useState<NetInfoState>();

  useEffect(() => {
    NetInfo.fetch().then(state => {
      setNetStatus(state);
    });
  }, []);

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#391495" />
      <Text style={{fontWeight: 'bold', color: '#0c0f0c', fontSize: 22}}>
        Tipo de Conexão:
        <Text style={{color: '#268e3e', textTransform: 'capitalize'}}>
          {' '}
          {netStatus?.type}
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
