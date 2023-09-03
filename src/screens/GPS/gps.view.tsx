import * as React from 'react';
import {Button, Text} from 'react-native';

import gpsController from './gps.controller';

const GpsView = ({navigation}: any) => {
  const {gpsLocation} = gpsController();

  return (
    <>
      <Text style={{fontWeight: 'bold', color: '#0c0f0c', fontSize: 22}}>
        Verificar:{' '}
        <Text style={{color: '#484e4a', textTransform: 'capitalize'}}>
          {' '}
          {'Latitune:'}
          {gpsLocation?.coords.altitude}
        </Text>
        <Text style={{color: '#484e4a', textTransform: 'capitalize'}}>
          {' '}
          {'Longitude: '}
          {gpsLocation?.coords.longitude}
        </Text>
      </Text>
      <Button onPress={async () => {}} title="Coletar GPS" color="#050435" />
    </>
  );
};

export default GpsView;
