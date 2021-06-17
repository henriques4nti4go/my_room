import * as React from 'react';
import { Text, View, StyleSheet,TouchableOpacity } from 'react-native';

interface CardProps {
    children:any
}

const Card = (props: CardProps) => {
    return (
      <View style={{
        marginVertical: 5,
        marginHorizontal:10,
        minHeight:100,
        borderRadius:5,
        borderWidth:1,
        borderColor: '#dbdbdb',
        padding:5
        }}>
        {props.children}
      </View>
    );
};

export default Card;

const styles = StyleSheet.create({
  container: {}
});
