import * as React from 'react';
import {
  Button,
  Text,
  StatusBar,
  TouchableOpacity,
  View,
  StyleSheet,
  useColorScheme,
  SafeAreaView,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Fragment} from 'react';

const {Navigator, Screen} = createNativeStackNavigator();

const HomeView = ({navigation}: any) => {
  const isDarkMode = useColorScheme() === 'dark';
  const teste = isDarkMode ? 'dark-content' : 'light-content';
  return (
    <>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor="#1f192f"
      />
      <Button
        title="Go to Camera"
        onPress={() => {
          let teste = isDarkMode ? 'dark-content' : 'light-content';
          console.log(teste);
          navigation.navigate('CameraView', {name: 'Jane'});
        }}
      />
      <Button
        title="Go to Net Status"
        onPress={() =>
          //console.log("teste", navigation)
          navigation.navigate('NetView', {name: 'Jane'})
        }
      />
      <Button
        title="Go to Get GPS"
        onPress={() =>
          //console.log("teste", navigation)
          navigation.navigate('GpsView', {name: 'Jane'})
        }
      />
      <Button
        title="Go to Pick File"
        onPress={() =>
          //console.log("teste", navigation)
          navigation.navigate('PickFileView', {name: 'Jane'})
        }
      />
    </>
  );
};

export default HomeView;
