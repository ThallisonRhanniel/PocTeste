import * as React from 'react';
import {
  Button,
  Text,
  StatusBar,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const {Navigator, Screen} = createNativeStackNavigator();

const HomeView = ({navigation}: any) => {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#391495" />
      <Button
        title="Go to Camera"
        onPress={() =>
          //console.log("teste", navigation)
          navigation.navigate('CameraView', {name: 'Jane'})
        }
      />
      <Button
        title="Go to Net Status"
        onPress={() =>
          //console.log("teste", navigation)
          navigation.navigate('NetView', {name: 'Jane'})
        }
      />
    </>
  );
};

export default HomeView;
