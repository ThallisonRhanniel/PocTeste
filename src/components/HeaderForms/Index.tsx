import React from 'react';
// import {MaterialIcons} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity, View, Text} from 'react-native';

import {styles} from './styles';

export function HeaderForm() {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.button}>
        <Text>era um vetor</Text>
        {/* <MaterialIcons name="chevron-left" size={32} color="#1967FB" /> */}
      </TouchableOpacity>

      <Text style={styles.title}>Cadastro</Text>
    </View>
  );
}
