import * as React from 'react';
import {Button, Text} from 'react-native';

import KeepAwakeExample from '../../components/KeepAwake/keepAwake';
import biometryController from './biometry.controller';

const BiometryView = ({navigation}: any) => {
  const {canHandleAutch} = biometryController();

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
          canHandleAutch();
        }}
        title="Coletar Biometria"
      />
    </>
  );
};

export default BiometryView;
