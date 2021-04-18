import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import style from '../../../styles/style';
import {
  Title,
  TextInput
} from 'react-native-paper';

interface componentNameProps {}

const componentName = (props: componentNameProps) => {
  
  return (
    <View style={[
      style.body,
      {
        alignItems: 'center'
      }
    ]}>
      <View
      style={[
        style.width,
      ]}
      >
        <Title>Perfil</Title>
        
      </View>
      <View
      style={[
        style.mb1,
        style.width,
      ]}
      >
        <TextInput placeholder={'nome de usuario'} />
      </View>
    </View>
  )
};

export default componentName;

const styles = StyleSheet.create({
  container: {flex:1,justifyContent: 'center',alignItems: 'center'}
});
