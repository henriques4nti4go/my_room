import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import Card from '_components/Cards';
import { connect } from 'react-redux';
import Divider  from '_components/Divider';
import {FONT_COLOR} from '_config/colors';
interface Props {
    data?:any;
    navigation?:any;
    setRoomSelected:any;
}
interface RoomProps {
    roomDetails:any;
}

function RoomContent(props:RoomProps) {
    const roomDetails = props.roomDetails;
    return (
        <Card>
            <View>
                <Text
                style={{fontWeight:'bold',fontSize:35,color:FONT_COLOR.PRIMARY}}
                >
                    {roomDetails.title}
                </Text>
                <Divider />    
            </View>
        </Card>
    );
}

const Index = (props:Props) =>{
    const rooms = props.data;
    console.log(props)
    return (
        <View>
            { rooms!= null 
            && rooms.length > 0
            &&
            <FlatList 
            data={rooms}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item,id) => String(id)}
            renderItem={({item}) => {
                return (
                    <TouchableOpacity 
                    onPress={() => {
                        props.setRoomSelected(item.id);
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
  })
  
  const mapDispatch = (dispatch:any) => {
    return {
      setRoomSelected: (value:string) =>{ dispatch({
        payload:{
            room_selected:value
        },
        type:'ROOM_SELECTED'
      })},
    }
  }
  
  export default connect(mapState,mapDispatch)(Index);
  

