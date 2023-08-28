import * as React from 'react';
import {Button, Text, StatusBar, StyleSheet, SafeAreaView} from 'react-native';

import filePickController from './filePick.controller';

const PickerFileView = ({navigation}: any) => {
  const {fileResponse, handleDocumentSelection} = filePickController();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'dark-content'} />
      {fileResponse.map((file, index) => (
        <Text key={index.toString()} numberOfLines={1} ellipsizeMode={'middle'}>
          {file?.uri}
        </Text>
      ))}
      <Button title="Select 📑" onPress={handleDocumentSelection} />
    </SafeAreaView>
  );
};

export default PickerFileView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
