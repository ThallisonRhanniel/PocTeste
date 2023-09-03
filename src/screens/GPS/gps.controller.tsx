import {useEffect, useState} from 'react';
import Geolocation, {GeoPosition} from 'react-native-geolocation-service';
import {hasLocationPermission} from '../../util/resquestPermission';

const gpsController = () => {
  /**
   * State
   */
  const [gpsLocation, setgpsLocation] = useState<GeoPosition>();

  /**
   * Callback
   * useCallback is used to prevent unnecessary re-renders
   */

  async function PedirGPS() {
    const resultPermission = await hasLocationPermission();
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

  /**
   * Effects
   */

  useEffect(() => {
    (async () => {
      await PedirGPS();
    })();
    // PedirGPS();
  }, []);

  /**
   * Binding with the view
   */
  return {gpsLocation};
};

export default gpsController;
