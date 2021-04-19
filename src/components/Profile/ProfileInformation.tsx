import * as React from 'react';
import { Text, View, StyleSheet,Image } from 'react-native';
import {connect} from 'react-redux';

interface componentNameProps {

}

const ProfileInformation = (profile_user:any) => {
    
    let {
        name,
        user_name,
    } = profile_user;
    

    return (
        <View style={{alignItems: 'center',justifyContent: 'center'}}>
            <Text>
                {name}
            </Text>
            <Text
            style={{fontWeight: 'bold'}}
            >
                @{user_name}
            </Text>
        </View>
    );
} 


export default ProfileInformation;
  
const styles = StyleSheet.create({
  container: {}
});
