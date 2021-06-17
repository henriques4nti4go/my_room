import * as React from 'react';
import { View, StyleSheet,Text} from 'react-native';
import {connect} from 'react-redux';
import ProfileImage from '_components/Profile/ProfileImage';
import ProfileInformation from '_components/Profile/ProfileInformation';
import ProfileEdit from '_components/Profile/ProfileEdit';
import style from '../../../styles/style';
import RoundImage from '_components/Images/RoundImage';
import Divider from '_components/Divider';

interface componentNameProps {
  profile_user: any,
  navigation: any
}

const Index = (props: componentNameProps) => {
  React.useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      
    });

    return unsubscribe;
  },[props.navigation])
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
        <RoundImage source={{uri: props.profile_user.profile_photo}} />
        <ProfileInformation {...props.profile_user}/>
      </View>
      {/* <Divider /> */}
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
