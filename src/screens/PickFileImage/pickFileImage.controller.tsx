import * as React from 'react';

import * as ImagePicker from 'react-native-image-picker';

const pickFileImageController = () => {
  /**
   * State
   */

  const [response, setResponse] = React.useState<any>(null);
  /**
   * Callback
   * useCallback is used to prevent unnecessary re-renders
   */

  const onButtonPress = React.useCallback((type: any, options: any) => {
    if (type === 'capture') {
      ImagePicker.launchCamera(options, setResponse);
    } else {
      ImagePicker.launchImageLibrary(options, setResponse);
    }
  }, []);

  /**
   * Effects
   */

  /**
   * Binding with the view
   */
  return {onButtonPress, response};
};

export default pickFileImageController;
