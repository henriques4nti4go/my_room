import * as React from 'react';
import { View, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import ProfileImage from '_components/Profile/ProfileImage';
import ProfileInformation from '_components/Profile/ProfileInformation';
import ProfileEdit from '_components/Profile/ProfileEdit';
import style from '../../../styles/style';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface componentNameProps {
  profile_user: object,
  navigation: any
}

const Index = (props: componentNameProps) => {
  let profile_user = props.profile_user;
  
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
        {
          height: 190,
          alignItems: 'center',
          justifyContent: 'flex-end',
        }
      ]}
      >
        <View
        style={{
          width: '100%',
        }}
        >
          <ProfileEdit 
          onPress={() => props.navigation.navigate('EditProfile')}
          style={{
            alignSelf: 'flex-end',
          }}          
          />
        </View>
        <ProfileImage {...profile_user} />
        <ProfileInformation {...profile_user}/>
      </View>
      
      <View
      style={[
      ]}
      >
    
      </View>
    </View>
  );
};

const mapState = (state:any) => ({
  user_access_token: state.user.user_access_token,
  profile_user: state.profile_user,
})

const mapDispatch = {
  toggleOn: () => ({ type: 'TOGGLE_IS_ON' })
}

export default connect(mapState,mapDispatch)(Index);


const styles = StyleSheet.create({
  
});
