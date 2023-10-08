import * as React from 'react';
import {
  Button,
  Text,
  StatusBar,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CameraView from './src/screens/Camera/camera.view';
import HomeView from './src/screens/Home/home.view';
import NetView from './src/screens/NetInfo/net.view';
import GpsView from './src/screens/GPS/gps.view';
import PickFileImageView from './src/screens/PickFileImage/pickFileImage.view';

const {Navigator, Screen} = createNativeStackNavigator();

import {useColorScheme} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import AudioView from './src/screens/Audio/audio.view';
import PickerFileView from './src/screens/FilePick/filePick.view';
import BiometryView from './src/screens/Biometry/biometry.view';
import SignatureView from 'react-native-signature-canvas';
import SignaturePageView from './src/screens/Signature/signature.view';
import CadastroPassword from './src/screens/CadastroPassword/cadastroPassword.view';
import CadastroPasswordView from './src/screens/CadastroPassword/cadastroPassword.view';

const HomeNavigator = () => (
  <Navigator>
    <Screen
      name="Home"
      component={HomeView}
      options={{
        title: 'Tela Inicial',
        navigationBarColor: '#2a6363',
        headerTintColor: '#781111',
        headerTransparent: true,
        statusBarColor: '#2c0556',
        headerRight: () => (
          <Button
            onPress={() => console.log('consoleLogTeste')}
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
    <Screen
      name="GpsView"
      component={GpsView}
      options={{title: 'Tela de GPS'}}
    />
    <Screen
      name="PickFileImageView"
      component={PickFileImageView}
      options={{title: 'Tela de pegar arquivos'}}
    />
    <Screen
      name="AudioView"
      component={AudioView}
      options={{title: 'Tela de Gravar audios'}}
    />
    <Screen
      name="PickerFileView"
      component={PickerFileView}
      options={{title: 'Tela de Pegar arquivos'}}
    />
    <Screen
      name="BiometryView"
      component={BiometryView}
      options={{title: 'Tela de Biometria'}}
    />
    <Screen
      name="SignatureView"
      component={SignaturePageView}
      options={{title: 'Tela de Assinatura'}}
    />
    <Screen
      name="CadastroPassword"
      component={CadastroPasswordView}
      options={{title: 'Tela de Password'}}
    />
  </Navigator>
);

//Tema personalizado
//https://reactnavigation.org/docs/themes/

export const AppNavigator = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <NavigationContainer theme={isDarkMode ? DarkTheme : DefaultTheme}>
      <HomeNavigator />
    </NavigationContainer>
  );
};
