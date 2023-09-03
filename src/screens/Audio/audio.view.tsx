import * as React from 'react';
import {Button, Text} from 'react-native';

import IsPermissionGranted from '../../util/requestPermissionAndroid';
import audioController from './audio.controller';

const AudioView = ({navigation}: any) => {
  const {audioData, onStartPlay, onStartRecord, onStopPlay, onStopRecord} =
    audioController();

  return (
    <>
      <Text style={{fontWeight: 'bold', color: '#0c0f0c', fontSize: 22}}>
        Tempo de gravacão: {audioData?.recordTime}
        <Text style={{color: '#268e3e', textTransform: 'capitalize'}}> </Text>
      </Text>

      {Number(audioData?.currentPositionSec) > 0 && (
        <Text style={{fontWeight: 'bold', color: '#0c0f0c', fontSize: 22}}>
          {''}
          Tempo do audio: {audioData?.playTime} {'\n'}
          Duracão: {audioData?.duration}
        </Text>
      )}

      <Button
        onPress={async () => {
          if (await IsPermissionGranted()) onStartRecord();
        }}
        title="Iniciar gravacão"
      />

      <Button
        onPress={async () => {
          if (await IsPermissionGranted()) onStopRecord();
        }}
        title="Pausar gravacão"
      />

      <Button
        onPress={async () => {
          if (await IsPermissionGranted()) onStartPlay();
        }}
        title="Tocar audio"
      />

      <Button
        onPress={async () => {
          if (await IsPermissionGranted()) onStopPlay();
        }}
        title="Pausar audio"
      />
    </>
  );
};

export default AudioView;
