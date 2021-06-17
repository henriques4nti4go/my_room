import * as React from 'react';
import { Text, View, StyleSheet,TextInput } from 'react-native';
import {GRAY} from '_config/colors';
interface componentNameProps {
    onChangeText:any;
    value:String;
}

const componentName = (props: componentNameProps) => {
  return (
    <View style={{
        flex:1,
        }}>
        <View
        style={{
            borderRadius:10,
            borderWidth:1,
            minHeight: 40,
            maxHeight:100,
            paddingVertical:2,
            paddingHorizontal:5,
            borderColor: GRAY
        }}
        >
            <TextInput value={props.value} onChangeText={props.onChangeText} multiline={true}/>
        </View>
    </View>
  );
};

export default componentName;

const styles = StyleSheet.create({
  container: {}
});
