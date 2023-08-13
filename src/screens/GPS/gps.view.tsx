import * as React from 'react';
import {
  Button,
  Text,
  StatusBar,
  TouchableOpacity,
  View,
  StyleSheet,
  Alert,
  PermissionsAndroid,
  Platform,
  ToastAndroid,
  Linking,
} from 'react-native';
import NetInfo, {NetInfoState} from '@react-native-community/netinfo';
import {useEffect, useState} from 'react';
import Geolocation, {GeoPosition} from 'react-native-geolocation-service';

const hasLocationPermission = async () => {
  if (Platform.OS === 'ios') {
    const hasPermission = await hasPermissionIOS();
    return hasPermission;
  }

  if (Platform.OS === 'android' && Platform.Version < 23) {
    return true;
  }

  const hasPermission = await PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  );

  if (hasPermission) {
    return true;
  }

  const status = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  );

  if (status === PermissionsAndroid.RESULTS.GRANTED) {
    return true;
  }

  if (status === PermissionsAndroid.RESULTS.DENIED) {
    ToastAndroid.show('Location permission denied by user.', ToastAndroid.LONG);
  } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
    ToastAndroid.show(
      'Location permission revoked by user.',
      ToastAndroid.LONG,
    );
  }

  return false;
};

const hasPermissionIOS = async () => {
  const openSetting = () => {
    Linking.openSettings().catch(() => {
      Alert.alert('Unable to open settings');
    });
  };
  const status = await Geolocation.requestAuthorization('whenInUse');

  if (status === 'granted') {
    return true;
  }

  if (status === 'denied') {
    Alert.alert('Location permission denied');
  }

  if (status === 'disabled') {
    Alert.alert(
      `Turn on Location Services to allow "tets to determine your location.`,
      '',
      [
        {text: 'Go to Settings', onPress: openSetting},
        {text: "Don't Use Location", onPress: () => {}},
      ],
    );
  }

  return false;
};

const GpsView = ({navigation}: any) => {
  const [gpsLocation, setgpsLocation] = useState<GeoPosition>();

  async function PedirGPS() {
    console.log('2');
    const resultPermission = await hasLocationPermission();
    console.log('teste1');
    if (resultPermission) {
      Geolocation.getCurrentPosition(
        position => {
          console.log(position);
          setgpsLocation(position);
        },
        error => {
          // See error code charts below.
          console.log(error.code, error.message);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    }
  }

  useEffect(() => {
    (async () => {
      await PedirGPS();
    })();
    // PedirGPS();
  }, []);

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
function wait(arg0: number) {
  throw new Error('Function not implemented.');
}
