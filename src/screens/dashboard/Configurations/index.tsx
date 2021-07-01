import * as React from 'react';
import { Text, View, StyleSheet,TouchableOpacity } from 'react-native';
import style from '../../../styles/style';
import {Icon} from 'react-native-elements';
import {connect} from 'react-redux';
import Container from '_components/Container';
import firebase from 'firebase';
import SwitchTheme from '_components/SwitchTheme';
import axios from 'axios';
import {endpoints} from '_config/endpoints';

interface componentNameProps {
  setAppTheme:Function;
  navigation:any;
  colors_theme: any;
  device_theme: string;
  user_id: any;
  user_access_token:string;
}

const componentName = (props: componentNameProps) => {
  const [switch_value,setSwitchValue] = React.useState(false);
  
  async function setTheme(theme:string) {
    console.log(theme);
    try {
      let {data} = await axios({
        method:'POST',
        url:endpoints.user.setTheme,
        headers: {
          token: props.user_access_token
        },
        data: {
          user_id: props.user_id,
          theme
        }
       })
       if (!data.error) props.setAppTheme(theme)
    } catch (error:any) {
      console.log(error.response.data)
    }
  }

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
        <View>
          <SwitchTheme onPress={(theme_selected:string) => setTheme(theme_selected)} theme={props.device_theme} />
        </View>
      </View>
    </Container>
  )
};

const mapState = (state:any) => ({
  user_access_token: state.user.user_access_token,
  profile_user: state.profile_user,
  device_theme: state.device.device_theme,
  colors_theme: state.device.colors_theme,
  user_id: state.user.user_id
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
