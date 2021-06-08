import * as React from 'react';
import { Text, View, StyleSheet,TextInput } from 'react-native';

interface componentNameProps {
    onChangeText:any
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
            paddingHorizontal:5
        }}
        >
            <TextInput onChangeText={props.onChangeText} multiline={true}/>
        </View>
    </View>
  );
};

export default componentName;

const styles = StyleSheet.create({
  container: {}
});
