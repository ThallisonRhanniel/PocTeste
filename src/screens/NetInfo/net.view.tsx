import * as React from 'react';
import {Button, Text, Alert} from 'react-native';
import netController from './net.controller';

const NetView = ({navigation}: any) => {
  const {netStatus} = netController();

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
