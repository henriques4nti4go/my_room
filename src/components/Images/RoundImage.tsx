import * as React from 'react';
import { Text, View, StyleSheet,Image } from 'react-native';
import {style} from '_styles/'
import {connect} from 'react-redux';

interface RoundImageProps {
    source:any;
    style?:any;
    colors_theme?:any;
}

const RoundImage = (props: RoundImageProps) => {
  const [source,setSource] = React.useState(props.source.uri ? props.source : require('_assets/profile-user.png'));
  return (
    <View style={[style.shadowBox,{backgroundColor:'white',borderRadius:100,paddingHorizontal:3,paddingVertical:3}]}>
      <Image source={source} style={[{width:100,height:100,borderRadius:100}]}/>
    </View>
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

export default connect(mapState,mapDispatch)(RoundImage);