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
import CameraView from './src/screens/Camera/camera.view';
import HomeView from './src/screens/Home/home.view';
import NetView from './src/screens/NetInfo/net.view';

const {Navigator, Screen} = createNativeStackNavigator();

const HomeNavigator = () => (
  <Navigator>
    <Screen
      name="Home"
      component={HomeView}
      options={{
        title: 'Tela Inicial',
        headerRight: () => (
          <Button
            onPress={() => console.log('oi')}
            title="Info"
            color="#050435"
          />
        ),
      }}
    />
    <Screen
      name="CameraView"
      component={CameraView}
      options={{title: 'Tela de Camera'}}
    />
    <Screen
      name="NetView"
      component={NetView}
      options={{title: 'Tela de Status Net'}}
    />
  </Navigator>
);

export const AppNavigator = () => (
  <NavigationContainer>
    <HomeNavigator />
  </NavigationContainer>
);
