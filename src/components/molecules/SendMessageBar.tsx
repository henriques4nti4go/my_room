import * as React from 'react';
import { Text, View, StyleSheet,ScrollView,TextInput,TouchableOpacity } from 'react-native';
import {Icon} from 'react-native-elements';
import TextField from '_components/molecules/TextField';

interface componentNameProps {
    onPress?:any;
    onChangeText?:any;
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
        <TextField onChangeText={props.onChangeText} />
        <TouchableOpacity
        onPress={props.onPress}
        style={{
            backgroundColor: 'green',
            borderRadius:100,
            padding:10,
            maxHeight:50,
            minWidth:50,
            marginLeft:10,
        }}
        >
          <Icon name='paper-plane' type='font-awesome'  />
        </TouchableOpacity>
      </View>
  );
};

export default componentName;

const styles = StyleSheet.create({
  container: {}
});
