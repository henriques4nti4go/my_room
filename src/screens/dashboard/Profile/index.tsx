import * as React from 'react';
import { View, StyleSheet,Text, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import ProfileInformation from '_components/Profile/ProfileInformation';
import ProfileEdit from '_components/Profile/ProfileEdit';
import RoundImage from '_components/Images/RoundImage';
import Container from '_components/Container';
import {style} from '_styles/'
interface componentNameProps {
  profile_user: IProfileUser,
  navigation: any
  colors_theme: any;
}

interface IProfileUser {
  bio:string;
  name:string;
  user_name:string;
  profile_photo:string;
}

const Index = (props: componentNameProps) => {
  
  React.useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      
    });

    return unsubscribe;
  },[props.navigation])
  return (
    <ScrollView style={{backgroundColor: props.colors_theme.BACKGROUND_VIEW}}>
      <View
        style={[
          // style.card,
          style.shadowBox,
          {backgroundColor: props.colors_theme.SECONDARY,borderRadius:10}
        ]}
        >
          {/* <View
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
          </View> */}
          <View style={{backgroundColor: props.colors_theme.PRIMARY,height:150}}>

          
          </View>
          <View style={{top:-40,width:'90%',alignSelf:'center'}}>
            <View style={{flexDirection:"row"}}>
              <RoundImage source={{uri: props.profile_user.profile_photo}} />
              <View style={{flex:1}}>
              </View>
            </View>
            <View>
              <View>
                <Text style={{color:props.colors_theme.FONT_COLOR,fontSize:40,fontWeight:'bold'}}>{props.profile_user.user_name}</Text>
              </View>
              <View>
                <Text style={{color:props.colors_theme.FONT_COLOR,fontSize:17}}>{props.profile_user.name}</Text>
              </View>
            </View>
          </View>
          {/* <ProfileInformation {...props.profile_user}/> */}
      </View>
      {
        props.profile_user.bio &&
        <View style={[
        // style.container,
          {marginVertical:20,width:'95%',alignSelf:'center'}
        ]}>
        <View style={[
          style.card,
          {backgroundColor: props.colors_theme.SECONDARY,borderRadius:5}
        ]}>
          <View>
            <Text style={{color:props.colors_theme.FONT_COLOR}}>
              {props.profile_user.bio}
            </Text>
          </View>
        </View>
        </View>
      }
    </ScrollView>
  );
};

const mapState = (state:any) => ({
  user_access_token: state.user.user_access_token,
  profile_user: state.profile_user,
  colors_theme: state.device.colors_theme
})

const mapDispatch = {
  toggleOn: () => ({ type: 'TOGGLE_IS_ON' })
}

export default connect(mapState,mapDispatch)(Index);

