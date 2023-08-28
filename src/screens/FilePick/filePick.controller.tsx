import React, {useCallback, useEffect, useState} from 'react';
import {View} from 'react-native';
import DocumentPicker, {
  types,
  DocumentPickerResponse,
} from 'react-native-document-picker';

const filePickController = () => {
  /**
   * State
   */

  const [fileResponse, setFileResponse] = useState<DocumentPickerResponse[]>(
    [],
  );

  /**
   * Callback
   * useCallback is used to prevent unnecessary re-renders
   */

  const handleDocumentSelection = React.useCallback(async () => {
    try {
      const response = await DocumentPicker.pick({
        //fullScreen | pageSheet | formSheet | overFullScreen
        presentationStyle: 'pageSheet',
        // type: [types.pdf],
        allowMultiSelection: true,
      });
      setFileResponse(response);
    } catch (err) {
      console.warn(`Aviso: ${err}`);
    }
  }, []);

  /**
   * Effects
   */

  /**
   * Binding with the view
   */
  return {fileResponse, handleDocumentSelection};
};

export default filePickController;
