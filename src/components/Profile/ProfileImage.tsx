import * as React from 'react';
import { Text, View, StyleSheet,Image } from 'react-native';
import {connect} from 'react-redux';

interface componentNameProps {
    profile_user:object
}

const ProfileImage = (profile_user:any) => {
    
    let {
        profile_photo
    } = profile_user;

    if (!profile_photo) {
        return (
            <Image
            style={{
                width: 85,
                height: 85,
            }}
            source={require('_assets/profile-user.png')}
            />
        );
    }

    return (
        <Image
        style={{
            width: 85,
            height: 85,
        }}
        source={{uri: profile_user.profile_photo}}
        />
    );
} 

const Profile = (props:componentNameProps) => {
    return (
        <View
        style={{
            borderWidth: 1,
            borderColor: 'rgba(1,1,1,0.1)',
            borderRadius: 100,
            padding: 5,
            backgroundColor: 'white'
        }}
        >
            <ProfileImage {...props} />
        </View>
    );
}

const mapState = (state:any) => ({
    profile_user: state.profile_user,
  })
  
  const mapDispatch = {
    toggleOn: () => ({ type: 'TOGGLE_IS_ON' })
  }
  
export default connect(mapState,mapDispatch)(Profile);
  
const styles = StyleSheet.create({
  container: {}
});
