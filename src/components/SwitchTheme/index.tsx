import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import {Icon} from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {connect} from 'react-redux';

interface IProps {
    colors_theme: any;
    theme:string;
    onPress: Function;
}

function index(props:IProps) {
    const [position,setPosition] = React.useState(props.theme == 'default' ? 0 : 45)
    const [theme,setTheme] = React.useState(props.theme);
    return (
        <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
            let theme_selected = position == 45 ? 'default' : 'dark';
            setPosition(position == 0 ? 45 : 0)
            setTheme(position == 0 ? 'default':'dark');
            props.onPress(theme_selected);
        }}
        >
            <View style={{borderRadius:20,borderWidth:3,borderColor:props.colors_theme.PRIMARY,flexDirection:'row',width:100}}>
                <View style={{width:50}}>
                    <Icon name='sun' color={props.colors_theme.PRIMARY} type='font-awesome-5' />
                </View>
                <View style={{width:50}}>
                    <Icon name='moon' color={props.colors_theme.PRIMARY} type='font-awesome-5' />
                </View>
                <View style={{backgroundColor: props.colors_theme.PRIMARY,width:50,height:25,borderRadius:100,left:position,position:'absolute'}}></View>
            </View>
        </TouchableOpacity>
    );
}


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
  
export default connect(mapState,mapDispatch)(index);
  

