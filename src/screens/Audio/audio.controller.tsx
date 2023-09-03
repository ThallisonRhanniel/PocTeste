import * as React from 'react';
import {
  Button,
  Text,
  StatusBar,
  TouchableOpacity,
  View,
  StyleSheet,
  Alert,
} from 'react-native';
import NetInfo, {NetInfoState} from '@react-native-community/netinfo';
import {useEffect, useState} from 'react';
import AudioRecorderPlayer, {
  RecordBackType,
} from 'react-native-audio-recorder-player';
import IsPermissionGranted from '../../util/requestPermissionAndroid';

const audioController = () => {
  /**
   * State
   */
  const [audioData, setAudioData] = useState<any>();
  const audioRecorderPlayer = new AudioRecorderPlayer();
  /**
   * Callback
   * useCallback is used to prevent unnecessary re-renders
   */

  const onStartRecord = async () => {
    const result = await audioRecorderPlayer.startRecorder();
    audioRecorderPlayer.addRecordBackListener(e => {
      setAudioData({
        recordSecs: e.currentPosition,
        recordTime: audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)),
      });
      return;
    });
    console.log(result);
    console.log(audioData);
  };

  const onStopRecord = async () => {
    const result = await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();
    setAudioData({
      recordSecs: 0,
      recordTime: audioData.recordTime,
    });
    console.log(result);
  };

  const onStartPlay = async () => {
    console.log('onStartPlay');
    const msg = await audioRecorderPlayer.startPlayer();
    console.log(msg);
    audioRecorderPlayer.addPlayBackListener(e => {
      setAudioData({
        currentPositionSec: e.currentPosition,
        currentDurationSec: e.duration,
        playTime: audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)),
        duration: audioRecorderPlayer.mmssss(Math.floor(e.duration)),
      });
      if (e.duration === e.currentPosition) {
        setAudioData({
          currentPositionSec: 0,
          currentDurationSec: e.duration,
          playTime: audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)),
          duration: audioRecorderPlayer.mmssss(Math.floor(e.duration)),
        });
      }
      return;
    });
  };

  //só funciona a partir do android 7.0
  const onPausePlay = async () => {
    await audioRecorderPlayer.pausePlayer();
  };

  const onStopPlay = async () => {
    console.log('onStopPlay');
    audioRecorderPlayer.stopPlayer();
    audioRecorderPlayer.removePlayBackListener();
  };

  /**
   * Effects
   */
  /**
   * Binding with the view
   */
  return {audioData, onStartRecord, onStartPlay, onStopPlay, onStopRecord};
};

export default audioController;
