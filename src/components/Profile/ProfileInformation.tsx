import * as React from 'react';
import { Text, View, StyleSheet,Image } from 'react-native';
import {connect} from 'react-redux';
import {GRAY} from '_config/colors';
interface componentNameProps {
    name:string;
    user_name:string;
    bio:string;
}

const ProfileInformation = (props:componentNameProps) => {
    return (
        <View style={{flex:1}}>
            <Text>
                {props.name}
            </Text>
            <Text
            style={{fontWeight: 'bold'}}
            >
                @{props.user_name}
            </Text>
            <View style={{width: 250,minHeight:100,borderRadius:5,borderWidth:1,borderColor: GRAY,marginTop:10,padding:5}}>
                <Text>{props.bio}</Text>
            </View>
        </View>
    );
} 


const mapState = (state:any) => ({
    user_access_token: state.user.user_access_token,
    profile_user: state.profile_user,
    name: state.profile_user.name,
    user_name: state.profile_user.user_name,
    bio: state.profile_user.bio
  })
  
  const mapDispatch = {
    toggleOn: () => ({ type: 'TOGGLE_IS_ON' })
  }
  
  export default connect(mapState,mapDispatch)(ProfileInformation);
  
  
  const styles = StyleSheet.create({
    
  });