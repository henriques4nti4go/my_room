import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import {connect} from 'react-redux';
import { colors, style } from '_styles/*';
interface componentNameProps {
  colors_theme:any
}

const componentName = (props: componentNameProps) => {
  return (
    <View style={[styles.container,{backgroundColor:props.colors_theme.BACKGROUND_VIEW}]}>
      <ActivityIndicator color={props.colors_theme.PRIMARY} size='small'/>
    </View>
  );
};

const mapStateToProps = (state:any) => {
  return{
    colors_theme: state.device.colors_theme
  }
};

const mapDispatchToProp = ( dispatch:any ) => {
  return{
     
  }
}


export default connect(mapStateToProps,mapDispatchToProp)(componentName);
const styles = StyleSheet.create({
  container: {
      flex:1,
      justifyContent: 'center',
      alignItems: 'center'
  }
});
