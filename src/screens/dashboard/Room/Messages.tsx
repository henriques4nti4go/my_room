import axios from 'axios';
import * as React from 'react';
import { Text, View, StyleSheet, ScrollView,FlatList,TextInput, TouchableOpacity , Image} from 'react-native';
import {connect} from 'react-redux';
import SendMessageBar from '_components/molecules/SendMessageBar';
import { endpoints } from '_config/endpoints';
import { style } from '_styles/';
import {PRIMARY,GRAY,FONT_COLOR} from '_config/colors';
import { ProcessDate } from '../../../utils';
import WebSocketClass from '../../../classes/WebSocket.class';
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
  const [client,setClient] = React.useState();

  React.useEffect(() => {
    connectWebSocket();
  },[]);

  React.useEffect(
    () => props.navigation.addListener('blur', () => closeConnectionWebsocket()),
    []
  );

  function closeConnectionWebsocket() {
    console.log(da())
  }

  function da() {
    return client;
  }

  function CardMessage(propsInternal:any) {
  
    const [messages] = React.useState(propsInternal.data);
    const [profile_photo,setProfilePhoto]  = React.useState(propsInternal.data.profile_photo);
    
    const [isUserMessage] = React.useState(messages.user_id  == props.user.user_id);
    const date = new ProcessDate();
    return (
      <View
      style={[{
        backgroundColor: isUserMessage ? GRAY :  PRIMARY,
        paddingHorizontal:5,
        paddingVertical:10,
        marginBottom:10,
        width:'90%',
        alignSelf: 'center',
        borderTopRightRadius:20,
        borderTopLeftRadius:20,
        borderBottomLeftRadius:20,
        borderBottomRightRadius:5,
        paddingLeft:20
      },style.shadowBox]}
      >
        <Text style={{color: 'white',fontWeight: 'bold'}}>{propsInternal.data.user_name}</Text>
        <View style={{flexDirection:'row'}}>
          <Image source={{uri: profile_photo }} style={{width:50,height:50,borderRadius:100}} />
          <View style={{flex:1,justifyContent: 'flex-end'}}>
            <Text
            style={{color:'white',textAlign: isUserMessage ? 'right' : 'left'}}
            >
              {propsInternal.children}
            </Text>
          </View>
        </View>
        <Text style={{color:FONT_COLOR.GRAY,fontSize:10}}>{date.dateWithPattern(propsInternal.data.created_at)}</Text>
      </View>
    );
  }

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
    
    if (!data.response.error) setMessagesRoom(data.response.messages.reverse())
  }

  async function connectWebSocket() {
    setLoading(true);
    await getMessages();
    let params = {
      user_id:props.user.user_id,
      token: props.user_access_token,
      room_id:props.room_selected,
      action:"CONNECTED"
    };

    const client_ws = new WebSocketClass(params);

    let ws:any = await client_ws.connectToSever();
    setClient(ws);
    console.log(ws)
    ws.onmessage = (response:any) =>{
      console.log(props.user.user_id)
      setMessagesRoom(JSON.parse(response.data).response.messages.reverse());
    }

  }

  async function sendMessage() {
    try {
      // let {data} = await axios({
      //   url: endpoints.user.messages.send_message_room,
      //   method: 'POST',
      //   headers: {
      //     'token': props.user_access_token,
      //   },
      //   data: {
      //     room_id: props.room_selected,
      //     user_id: props.user.user_id,
      //     message: messageText
      //   }
      // });
      let ws:any = client;
      
      ws.send(JSON.stringify({
        room_id: props.room_selected,
        user_id: props.user.user_id,
        message: messageText,
        token:props.user_access_token,
      }));

      setMessageText('');
      // await getMessages();
    } catch (error:any) {
      // console.log(error.data.reponse)
    }
  }
  
  return (
    <View style={[style.container]}>
      <FlatList 
      showsVerticalScrollIndicator={false}
      refreshing={true}
      inverted={true}
      data={messagesRoom} 
      keyExtractor={(item,id) => String(id)}
      renderItem={({item}) => {
        const messageExists = item;
        return messageExists ? <CardMessage data={item}>{item.message}</CardMessage> : <Text></Text>;
      }}
      />
      <View style={[style.shadowBox,{marginTop:10,width:'90%',alignSelf: 'center'}]}>
        <SendMessageBar
        onPress={() => sendMessage()}
        value={messageText}
        onChangeText={(text:any) => setMessageText(text)}
        />
      </View>
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


