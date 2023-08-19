import React, {useState} from 'react';
import {Button, Switch, Text, View} from 'react-native';

import KeepAwake, {
  activateKeepAwake,
  deactivateKeepAwake,
} from '@sayem314/react-native-keep-awake';

export default function KeepAwakeExample() {
  const [isEnabledSwitch, setIsEnabledSwitch] = useState<boolean>(false);

  function toggleSwitch(value: boolean): void | Promise<void> {
    setIsEnabledSwitch(prevState => !prevState);
    value ? activateKeepAwake() : deactivateKeepAwake();
  }

  return (
    <>
      {/* <KeepAwake /> */}
      <Text
        style={{color: '#41239a', textTransform: 'capitalize', fontSize: 16}}>
        Deseja bloquear a tela?
      </Text>
      <Switch
        style={{margin: 10}}
        trackColor={{false: '#767577', true: '#81b0ff'}}
        thumbColor={isEnabledSwitch ? '#27c834' : '#d83d26'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabledSwitch}
      />
    </>
  );
}
