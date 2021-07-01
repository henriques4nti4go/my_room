import * as React from 'react';
import { Text, View, StyleSheet,ScrollView,TextInput,TouchableOpacity } from 'react-native';
import {Icon} from 'react-native-elements';
import TextField from '_components/molecules/TextField';
import {PRIMARY,SECONDARY} from '_config/colors';
import {connect} from 'react-redux';

interface componentNameProps {
    onPress?:any;
    onChangeText?:any;
    value: String;
    colors_theme:any;
}

const componentName = (props: componentNameProps) => {
  console.log(props)
  return (
    <View 
        style={{
        minHeight:50,
        flexDirection:'row',
        maxHeight: 150,
        marginBottom:10,
        borderWidth:1,
        borderColor:props.colors_theme.PRIMARY,
        borderRadius:25,
        backgroundColor: 'white'
        }}>
          <TextInput style={{flex:1,paddingLeft:25}} value={props.value} onChangeText={props.onChangeText} />
          <TouchableOpacity
          onPress={props.onPress}
          style={{
              backgroundColor: PRIMARY,
              borderRadius:100,
              padding:10,
              maxHeight:50,
              minWidth:50,
              marginLeft:10,
          }}
          >
            <Icon name='paper-plane' color={SECONDARY} type='font-awesome'  />
          </TouchableOpacity>
      </View>
  );
};

const mapState = (state:any) => ({
  user_access_token: state.user.user_access_token,
  profile_user: state.profile_user,
  user: state.user,
  room_selected: state.room.room_selected,
  colors_theme: state.device.colors_theme
})

const mapDispatch = {
  toggleOn: () => ({ type: 'TOGGLE_IS_ON' })
}

export default connect(mapState,mapDispatch)(componentName);