import * as React from 'react';
import { Text, View, StyleSheet,Animated,TouchableOpacity } from 'react-native';
import {
    Icon
} from 'react-native-elements';

interface componentNameProps {}

const componentName = (props: componentNameProps) => {
    

    return (
        <TouchableOpacity
        style={{
            width: 30,
            height: 30,
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: 10
        }}
        onPress={() => console.log('asdasd')}
        >
            <Icon type='feather' color='gray' name='smile' />
            <Animated.View
            style={{
                backgroundColor: 'red',
                height:200
            }}
            >
                
            </Animated.View>
        </TouchableOpacity>
    );
};

export default componentName;

const styles = StyleSheet.create({
  container: {}
});
