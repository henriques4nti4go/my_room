import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import style from '../../../styles/style';
import {
  Title,
  TextInput
} from 'react-native-paper';
import { Switch, TouchableOpacity } from 'react-native-gesture-handler';
import {connect} from 'react-redux';

interface componentNameProps {
  setAppTheme:Function;
  navigation:any
}

const componentName = (props: componentNameProps) => {
  const [switch_value,setSwitchValue] = React.useState(false);
  
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
      <Switch
      onValueChange={() => {
        props.setAppTheme(switch_value? 'dark' : 'default')
        setSwitchValue(!switch_value)
      }}
      value={switch_value}
      ></Switch>
      <TouchableOpacity
      onPress={() => props.navigation.navigate('Home') }
      >
        <Text>
          go home
        </Text>
      </TouchableOpacity>
    </View>
  )
};

const mapState = (state:any) => ({
  user_access_token: state.user.user_access_token,
  profile_user: state.profile_user,
  device_theme: state.device.device_theme,
  colors_theme: state.device.colors_theme
})

const mapDispatch = (dispatch:any) => {
  return {
    setRoomSelected: (value:string) =>{ dispatch({
      payload:{
          room_selected:value
      },
      type:'ROOM_SELECTED'
    })},
    setAppTheme: (value: object) => { dispatch({
      payload: value,
      type: 'APP_THEME',
  })}
  }
}

export default connect(mapState,mapDispatch)(componentName);

const styles = StyleSheet.create({
  container: {flex:1,justifyContent: 'center',alignItems: 'center'}
});
