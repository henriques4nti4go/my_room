import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import Card from '_components/Cards';
import { connect } from 'react-redux';
import Divider  from '_components/Divider';
import {FONT_COLOR} from '_config/colors';
import { Icon } from 'react-native-elements';
interface Props {
    data?:any;
    navigation?:any;
    setRoomSelected:any;
    colors_theme: any;
}
interface RoomProps {
    roomDetails:any;
}


const Index = (props:Props) =>{
    
    function RoomContent(item:RoomProps) {
        return (
            <View
            style={{
                borderWidth:3,
                marginTop:10,
                borderRadius:5,
                paddingLeft:10,
                backgroundColor: props.colors_theme.SECONDARY,
                borderColor: props.colors_theme.PRIMARY
            }}
            >
                <View style={{paddingVertical: 10}}>
                    <View style={{flexDirection:'row'}}>
                        <View style={{
                            borderRadius:200,
                            shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,
                            elevation: 5,
                            backgroundColor: 'white',
                            paddingVertical:10,
                            paddingHorizontal:10
                            }}>
                            <Icon size={30} type='font-awesome-5' name='door-open' />
                        </View>
                        <View style={{marginLeft:10}}>
                            <Text
                            style={{fontWeight:'bold',fontSize:17,color:props.colors_theme.PRIMARY}}
                            >
                                {item.roomDetails.title}
                            </Text>
                            <Text style={{color:props.colors_theme.FONT_COLOR}}>{item.roomDetails.description}</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
    return (
        <View>
            { props.data!= null 
            && props.data.length > 0
            &&
            <FlatList 
            data={props.data}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item,id) => String(id)}
            renderItem={({item}) => {
                return (
                    <TouchableOpacity 
                    onPress={() => {
                        const payload = {
                            room_id: item.id,
                            title: item.roomDetails.title,
                            description: item.roomDetails.description,
                            created_at: item.roomDetails.created_at,
                        }
                    
                        props.setRoomSelected(payload);
                        props.navigation.navigate('MessagesRoom');
                    }
                    }><RoomContent {...item} /></TouchableOpacity>
                );
            }}
            />}
        </View>
    );
}


const mapState = (state:any) => ({
    user_access_token: state.user.user_access_token,
    profile_user: state.profile_user,
    colors_theme: state.device.colors_theme
  })
  
  const mapDispatch = (dispatch:any) => {
    return {
      setRoomSelected: (payload:any) =>{ dispatch({
        payload,
        type:'ROOM_SELECTED'
      })},
    }
  }
  
  export default connect(mapState,mapDispatch)(Index);
  

