import * as React from 'react';
import { Text, View, StyleSheet,TouchableOpacity } from 'react-native';
import {connect} from 'react-redux';
import {Icon} from 'react-native-elements';
import {style} from '_styles/'
interface IProps {
  colors_theme:any;
  children?:any;
  navigation?:any;
}

const Header = (props: IProps) => {
  const localStyle = StyleSheet.create({
    dimensions: {height:50,width:'100%'},
    padding: {paddingHorizontal:10,paddingVertical:5}
  });

  return (
    <View
    style={[localStyle.dimensions,localStyle.padding,style.shadowBox,{flexDirection:'row',backgroundColor: props.colors_theme.SECONDARY,alignItems:'center'}]}
    >
      <TouchableOpacity onPress={() => console.log(props.navigation.goBack())} style={{width:50}}>
        <Icon name='arrow-left' color={props.colors_theme.FONT_COLOR} type='font-awesome-5' /> 
      </TouchableOpacity>
      <View style={{flex:1}}>
        {props.children}
      </View>
    </View>
  );
};

const mapState = (state:any) => ({
  user_access_token: state.user.user_access_token,
  profile_user: state.profile_user,
  device_theme: state.device.device_theme,
  colors_theme: state.device.colors_theme
})


const mapDispatch = (dispatch:any) => {
  return {
  }
}

export default connect(mapState,mapDispatch)(Header);
