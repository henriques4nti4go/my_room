import * as React from 'react';
import { Text, View, StyleSheet,Image } from 'react-native';
import {
    Icon
} from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface componentNameProps {
    profile_user:object,
    style:object,
    onPress: any
}

const ProfileEdit = (props:componentNameProps) => {
    return (
        <TouchableOpacity
        onPress={props.onPress}
        style={[
            {
                borderWidth: 1,
                borderRadius: 10,
                flexDirection: 'row',
                paddingHorizontal: 10,
                paddingVertical: 3,
                alignItems: 'center',
                borderColor: 'rgba(1,1,1,0.1)',
            },
            props.style
        ]}
        >
            <Text style={{fontWeight:'bold',paddingRight: 10}}>Editar Perfil</Text>
            <Icon type='feather' name='edit'  />
        </TouchableOpacity>
    );
}

  
export default ProfileEdit;
  
const styles = StyleSheet.create({
  container: {}
});
