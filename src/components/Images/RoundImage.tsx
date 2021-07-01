import * as React from 'react';
import { Text, View, StyleSheet,Image } from 'react-native';
import {style} from '_styles/'


interface RoundImageProps {
    source:any;
    style?:any;
}

const RoundImage = (props: RoundImageProps) => {
  return (
    <Image source={props.source} style={[{width:100,height:100,borderRadius:100,backgroundColor:'white'},style.shadowBox]}/>
  );
};

export default RoundImage;

const styles = StyleSheet.create({
  container: {}
});
