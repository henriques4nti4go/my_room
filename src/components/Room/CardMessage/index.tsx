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
    const [user_photo,setUserPhoto] = React.useState(props.profile_photo ? {uri: props.profile_photo} : require('_assets/profile-user.png'))
    const isUserMessage = Number(props.user_id) === Number(props.user.user_id);
    console.log(props.user)
    const date = new ProcessDate();
    return (
        <View style={{flexDirection:'row',marginVertical:5,marginHorizontal:5}}>

            <View style={{alignSelf:'flex-end'}}>
                {
                    !isUserMessage && 
                    <View style={[{width:50,height:50,borderRadius:100,backgroundColor:'white',marginRight:10},style.shadowBox]}>
                        <Image source={user_photo} style={[{width:50,height:50,borderRadius:100}]} />
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
                paddingLeft:20,
                justifyContent: 'flex-start',
                flex:1
            },
            style.shadowBox,
            isUserMessage ? localStyle.userBorder : localStyle.normalBorder
            ]}
            >
                <Text style={{color: props.colors_theme.FONT_COLOR,fontWeight: 'bold',marginBottom:5}}>{props.user_name ? props.user_name : 'usuario desativado'}</Text>
                <Text
                style={{
                    color:props.colors_theme.FONT_COLOR,
                    marginBottom:2
                }}
                >
                    {props.message}
                {/* {`${props.user.user_id} == ${props.user_id} ${isUserMessage}`} */}
                </Text>
                <Text style={{color:props.colors_theme.FONT_COLOR,fontSize:10}}>{date.dateWithPattern(props.created_at)}</Text>
            </View>
        </View>
    );
}

const localStyle = StyleSheet.create({
    userBorder: {
        borderTopRightRadius:20,
        borderTopLeftRadius:20,
        borderBottomLeftRadius:20,
        borderBottomRightRadius:5,
    },
    normalBorder:{
        borderTopRightRadius:20,
        borderTopLeftRadius:20,
        borderBottomLeftRadius:5,
        borderBottomRightRadius:20,
    }
})

const mapState = (state:any) => ({
    profile_user: state.profile_user,
    user: state.user,
    colors_theme: state.device.colors_theme
})

const mapDispatch = {
    toggleOn: () => ({ type: 'TOGGLE_IS_ON' })
}

export default connect(mapState,mapDispatch)(Index);