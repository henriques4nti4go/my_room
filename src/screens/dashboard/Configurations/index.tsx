import * as React from 'react';
import { Text, View, StyleSheet,TouchableOpacity } from 'react-native';
import style from '../../../styles/style';
import {Icon} from 'react-native-elements';
import {connect} from 'react-redux';
import Container from '_components/Container';
import firebase from 'firebase';

interface componentNameProps {
  setAppTheme:Function;
  navigation:any;
  colors_theme: any;
}

const componentName = (props: componentNameProps) => {
  const [switch_value,setSwitchValue] = React.useState(false);
  
  return (
    <Container>
      <View
      style={[
        {
          backgroundColor: props.colors_theme.SECONDARY,
          marginTop:10,
          borderRadius:5
        },
        style.cardPadding
      ]}
      >
        <TouchableOpacity style={{flexDirection:'row',marginTop:10}} onPress={() => props.navigation.navigate('EditProfile')}>
          <Icon color={props.colors_theme.PRIMARY} type='font-awesome-5' name='user' />
          <Text style={{alignSelf:'flex-end',marginLeft:20,color:props.colors_theme.FONT_COLOR}}>Editar Perfil</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{flexDirection:'row',marginTop:10}} onPress={() => {
          firebase.auth().signOut().then((res) => {
            props.navigation.navigate('SignIn')
          })
        }}>
          <Icon color={props.colors_theme.PRIMARY} type='font-awesome-5' name='sign-out-alt' />
          <Text style={{alignSelf:'flex-end',marginLeft:20,color:props.colors_theme.FONT_COLOR}}>Logout</Text>
        </TouchableOpacity>
      </View>
    </Container>
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
