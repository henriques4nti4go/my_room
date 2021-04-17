import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import {
  TextInput,
  Title
} from 'react-native-paper';
import {
   Divider
} from 'react-native-elements';
import style from '../../../styles/style';
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
  );
};

export default componentName;

const styles = StyleSheet.create({
  
});
