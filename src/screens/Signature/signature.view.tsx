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
  SafeAreaView,
  TextInput,
  Image,
  ScrollView,
} from 'react-native';
import NetInfo, {NetInfoState} from '@react-native-community/netinfo';
import Geolocation, {GeoPosition} from 'react-native-geolocation-service';
import DocumentPicker, {
  types,
  DocumentPickerResponse,
} from 'react-native-document-picker';
import RNFetchBlob from 'rn-fetch-blob';
import SignatureScreen from 'react-native-signature-canvas';
import {useRef, useState} from 'react';

const SignaturePageView = ({navigation}: any) => {
  const [signature, setSign] = useState<any | null>(null);
  const [colorText, setPenColor] = useState('');
  const ref = useRef<any | null>();

  // Called after ref.current.readSignature() reads a non-empty base64 string
  const handleOK = (signature: any) => {
    console.log(signature);
    setSign(signature);
    console.log(colorText);
  };

  const handleEmpty = () => {
    Alert.alert('Kindly Affix your Signature!');
  };

  const handleClear = () => {
    console.log('clear success!');
  };

  const handleColorChange = () => {
    ref.current.changePenColor(colorText);
  };
  const handleUndo = () => {
    ref.current.undo();
  };
  const handleRedo = () => {
    ref.current.redo();
  };

  const handleSave = async () => {
    console.log('Aloo');
    if (Platform.OS === 'android') {
      var isReadGranted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );
      console.log(isReadGranted);
      if (isReadGranted === PermissionsAndroid.RESULTS.GRANTED) {
        const dirs = RNFetchBlob.fs.dirs;
        console.log(dirs);
        var image_data = signature.split('data:image/png;base64,');
        const filePath =
          dirs.DownloadDir +
          '/' +
          'signture' +
          new Date().getMilliseconds() +
          '.png';
        RNFetchBlob.fs
          .writeFile(filePath, image_data[1], 'base64')
          .then(() => {
            console.log('got here', filePath);
            // RNFetchBlob.ios.previewDocument('file://' + filePath);
          })
          .catch(errorMessage => {
            console.log(errorMessage);
          });
      }
    }

    if (Platform.OS === 'ios') {
      const dirs = RNFetchBlob.fs.dirs;
      console.log(dirs);
      var image_data = signature.split('data:image/png;base64,');
      const filePath =
        dirs.DocumentDir +
        '/' +
        'signature' +
        new Date().getMilliseconds() +
        '.png';
      RNFetchBlob.fs
        .writeFile(filePath, image_data[1], 'base64')
        .then(() => {
          RNFetchBlob.ios.previewDocument('file://' + filePath);
          console.log(filePath);
        })
        .catch(errorMessage => {
          console.log(errorMessage);
        });
    }
  };

  return (
    <>
      <Text style={styles.textSign}>Sign Below</Text>
      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.setButton, {marginRight: 30, backgroundColor: 'red'}]}
          onPress={handleUndo}>
          <Text style={styles.text}>Undo</Text>
        </TouchableOpacity>
        {/* <TextInput
          placeholder="Specify Pen Color"
          style={styles.textInput}
          autoCapitalize="none"
          value={colorText}
          onChangeText={setPenColor}
        /> */}
        <TouchableOpacity style={styles.setButton} onPress={handleColorChange}>
          <Text style={styles.text}>Set</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.setButton, {marginLeft: 30, backgroundColor: 'red'}]}
          onPress={handleRedo}>
          <Text style={styles.text}>Redo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.text}>Save Signature</Text>
        </TouchableOpacity>
      </View>
      <View style={{height: 350}}>
        <SignatureScreen
          ref={ref}
          onOK={handleOK}
          onEmpty={handleEmpty}
          penColor={colorText}
          onClear={handleClear}
          confirmText="Preview"
          // onGetData={handleData}
        />
      </View>
      <Text style={styles.textSign}>Preview Signature</Text>
      <Image
        resizeMode={'cover'}
        style={{width: 300, height: 180, paddingBottom: 20}}
        source={{uri: signature}}
      />
    </>
    // <>
    //   <ScrollView
    //     contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}>
    //     <View style={styles.container}>
    //       <Text style={styles.textSign}>Sign Below</Text>
    //       <View style={styles.row}>
    //         <TouchableOpacity
    //           style={[
    //             styles.setButton,
    //             {marginRight: 30, backgroundColor: 'red'},
    //           ]}
    //           onPress={handleUndo}>
    //           <Text style={styles.text}>Undo</Text>
    //         </TouchableOpacity>
    //         <TextInput
    //           placeholder="Specify Pen Color"
    //           style={styles.textInput}
    //           autoCapitalize="none"
    //           value={colorText}
    //           onChangeText={setPenColor}
    //         />
    //         <TouchableOpacity
    //           style={styles.setButton}
    //           onPress={handleColorChange}>
    //           <Text style={styles.text}>Set</Text>
    //         </TouchableOpacity>
    //         <TouchableOpacity
    //           style={[
    //             styles.setButton,
    //             {marginLeft: 30, backgroundColor: 'red'},
    //           ]}
    //           onPress={handleRedo}>
    //           <Text style={styles.text}>Redo</Text>
    //         </TouchableOpacity>
    //       </View>

    //       <View style={{height: 350}}>
    //         <SignatureScreen
    //           ref={ref}
    //           onOK={handleOK}
    //           onEmpty={handleEmpty}
    //           penColor={colorText}
    //           onClear={handleClear}
    //           confirmText="Preview"
    //           // onGetData={handleData}
    //         />
    //       </View>

    //       <Text style={styles.textSign}>Preview Signature</Text>
    //       <Image
    //         resizeMode={'cover'}
    //         style={{width: 300, height: 180, paddingBottom: 20}}
    //         source={{uri: signature}}
    //       />
    //       <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
    //         <Text style={styles.text}>Save Signature</Text>
    //       </TouchableOpacity>
    //     </View>
    //   </ScrollView>
    // </>
  );
};

export default SignaturePageView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 250,
    padding: 10,
  },
  containerScroll: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  textSign: {
    color: 'deepskyblue',
    fontWeight: 'bold',
    paddingVertical: 5,
  },
  text: {
    color: '#fff',
    fontWeight: '900',
  },
  textInput: {
    paddingVertical: 10,
    textAlign: 'center',
  },
  saveButton: {
    backgroundColor: 'deepskyblue',
    textAlign: 'center',
    fontWeight: '900',
    color: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  setButton: {
    backgroundColor: 'deepskyblue',
    textAlign: 'center',
    fontWeight: '900',
    color: '#fff',
    marginHorizontal: 10,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});
