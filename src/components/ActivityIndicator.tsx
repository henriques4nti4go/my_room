import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

interface componentNameProps {}

const componentName = (props: componentNameProps) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size='small'/>
    </View>
  );
};

export default componentName;

const styles = StyleSheet.create({
  container: {
      flex:1,
      justifyContent: 'center',
      alignItems: 'center'
  }
});
