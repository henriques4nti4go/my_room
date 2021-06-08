import axios from 'axios';
import * as React from 'react';
import { Text, View, StyleSheet, ScrollView,FlatList,TextInput, TouchableOpacity } from 'react-native';
import {connect} from 'react-redux';
import SendMessageBar from '_components/molecules/SendMessageBar';
import { endpoints } from '_config/endpoints';
import { style } from '_styles/';

interface RoomMessagesProps {
  navigation:any;
  user_access_token:string;
  room_selected:string;
  user:any
}

const Index = (props: RoomMessagesProps) => {
  const [messagesRoom,setMessagesRoom] = React.useState(null);
  const [messageText,setMessageText] = React.useState('');
  const [loading,setLoading] = React.useState(true);

  React.useEffect(() => {
    getMessages();
  },[])

  async function getMessages() {
    let {data} = await axios({
      url: endpoints.user.messages.get_messages,
      method: 'POST',
      headers: {
        'token': props.user_access_token
      },
      data:{
        room_id:props.room_selected
      }
    });
    console.log(data)
    if (!data.response.error) setMessagesRoom(data.response.messages)
  }

  async function sendMessage() {
    try {
      let {data} = await axios({
        url: endpoints.user.messages.send_message_room,
        method: 'POST',
        headers: {
          'token': props.user_access_token,
        },
        data: {
          room_id: props.room_selected,
          user_id: props.user.user_id,
          message: messageText
        }
      });
    } catch (error:any) {
      console.log(error.data.reponse)
    }
  }
  
  return (
    <View style={[style.container]}>
      <FlatList 
      data={messagesRoom} 
      keyExtractor={(item,id) => String(id)}
      renderItem={({item}) => {
        const messageExists = item.data;
        return messageExists ? <Text>{item.data.message}</Text> : <Text></Text>;
      }}
      />
      <SendMessageBar
      onPress={() => sendMessage()}
      onChangeText={(text:any) => setMessageText(text)}
      />
    </View>
  );
};

const mapState = (state:any) => ({
  user_access_token: state.user.user_access_token,
  profile_user: state.profile_user,
  user: state.user,
  room_selected: state.room.room_selected
})

const mapDispatch = {
  toggleOn: () => ({ type: 'TOGGLE_IS_ON' })
}

export default connect(mapState,mapDispatch)(Index);


