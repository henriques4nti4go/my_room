import * as React from 'react';
import { Text, View, StyleSheet,ScrollView,TextInput,TouchableOpacity } from 'react-native';
import {Icon} from 'react-native-elements';
import TextField from '_components/molecules/TextField';
import {PRIMARY,SECONDARY} from '_config/colors';

interface componentNameProps {
    onPress?:any;
    onChangeText?:any;
    value: String;
}

const componentName = (props: componentNameProps) => {
  return (
    <View 
        style={{
        minHeight:50,
        flexDirection:'row',
        maxHeight: 150,
        marginBottom:10
        }}>
          <TextField value={props.value} onChangeText={props.onChangeText} />
          <TouchableOpacity
          onPress={props.onPress}
          style={{
              backgroundColor: PRIMARY,
              borderRadius:100,
              padding:10,
              maxHeight:50,
              minWidth:50,
              marginLeft:10,
          }}
          >
          <Icon name='paper-plane' color={SECONDARY} type='font-awesome'  />
        </TouchableOpacity>
      </View>
  );
};

export default componentName;

const styles = StyleSheet.create({
  container: {}
});
