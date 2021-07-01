import * as React from 'react';
import { Text, View, StyleSheet,Image } from 'react-native';
import {connect} from 'react-redux';
import { ProcessDate } from '../../../utils';
import {style} from '_styles/';

interface CardMessageProps {
    message:string;
    message_id:number;
    profile:number;
    profile_photo:string;
    room_id:number;
    user_id:number;
    user_name:string;
    created_at: Date;
    user:any;
    colors_theme:any;
}

function Index(props:CardMessageProps) {
    // const [messages] = React.useState(propsInternal.data);
    // const [profile_photo,setProfilePhoto]  = React.useState(propsInternal.data.profile_photo);
    
    const [isUserMessage] = React.useState(props.user_id  == props.user.user_id);
    const date = new ProcessDate();
    return (
        <View style={{flexDirection:'row',marginVertical:5,marginHorizontal:5}}>

            <View style={{alignSelf:'flex-end'}}>
                {
                    !isUserMessage && 
                    <View style={[{width:50,height:50,borderRadius:100,backgroundColor:'white',marginRight:10},style.shadowBox]}>
                        <Image source={{uri: props.profile_photo }} style={[{width:50,height:50,borderRadius:100}]} />
                    </View>
                    
                }
            </View>
            <View
            style={[{
                backgroundColor: isUserMessage ? props.colors_theme.PRIMARY :  props.colors_theme.SECONDARY,
                paddingHorizontal:5,
                paddingVertical:10,
                // marginBottom:10,
                // alignSelf: 'center',
                borderTopRightRadius:20,
                borderTopLeftRadius:20,
                borderBottomLeftRadius:20,
                borderBottomRightRadius:5,
                paddingLeft:20,
                justifyContent: 'flex-start',
                flex:1
            },style.shadowBox]}
            >
                <Text style={{color: props.colors_theme.FONT_COLOR,fontWeight: 'bold',marginBottom:5}}>{props.user_name}</Text>
                <Text
                style={{
                    color:props.colors_theme.FONT_COLOR,
                    marginBottom:2
                }}
                >
                {props.message}
                </Text>
                <Text style={{color:props.colors_theme.FONT_COLOR,fontSize:10}}>{date.dateWithPattern(props.created_at)}</Text>
            </View>
        </View>
    );
  }

const mapState = (state:any) => ({
    profile_user: state.profile_user,
    user: state.user,
    colors_theme: state.device.colors_theme
})

const mapDispatch = {
    toggleOn: () => ({ type: 'TOGGLE_IS_ON' })
}

export default connect(mapState,mapDispatch)(Index);