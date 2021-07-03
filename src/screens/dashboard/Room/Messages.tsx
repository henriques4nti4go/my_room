import axios from 'axios';
import * as React from 'react';
import { Text, View,FlatList,} from 'react-native';
import {connect} from 'react-redux';
import SendMessageBar from '_components/molecules/SendMessageBar';
import ActivityIndicator from '_components/ActivityIndicator'
import { endpoints } from '_config/endpoints';
import { style } from '_styles/';
import WebSocketClass from '../../../classes/WebSocket.class';
import CardMessage from '_components/Room/CardMessage';
import Container from '_components/Container';

interface RoomMessagesProps {
  navigation:any;
  user_access_token:string;
  room_selected:string;
  user:any;
  room:any;
  colors_theme: any;
}

const initialState = {ws:null};

function reducer(state:any, action:any) {
  state.ws = action.payload; 
  return state;
}

const Index = (props: RoomMessagesProps) => {
  const [messagesRoom,setMessagesRoom] = React.useState(null);
  const [messageText,setMessageText] = React.useState('');
  const [loading,setLoading] = React.useState(true);
  const [client,setClient] = React.useState(null);
  const [state,dispatch] = React.useReducer(reducer, initialState);

  React.useEffect(() => {
    connectWebSocket();
  },[]);

  React.useEffect(() => {
    
    const unsubscribe = props.navigation.addListener('blur', () => {
      // state.ws.close();
    });

    return unsubscribe;
  }, [props.navigation]);


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

    // console.log(
    //   props.user.user_id,props.room_selected,props.user_access_token
    // );
    let ws:any = await new WebSocketClass(props.user.user_id,props.room_selected,props.user_access_token).connectToSever();
    dispatch({
      payload:ws,
    });
    
    setLoading(false)
    state.ws.onmessage = (response:any) =>{
      setMessagesRoom(JSON.parse(response.data).response.messages.reverse());
    }

  }

  async function sendMessage() {
    try {
      state.ws.send(messageText);
      setMessageText('');
      // await getMessages();
    } catch (error:any) {
      // console.log(error.data.reponse)
    }
  }

  function HeaderMessages() {
    return <Text style={[{color: props.colors_theme.FONT_COLOR,fontSize:25,fontWeight:'bold'}]}>{props.room.title}</Text>
  }

  if (loading) return <ActivityIndicator />
  
  return (
    <Container
    navigation={props.navigation}
    header={<HeaderMessages/>}
    >
      <FlatList 
      showsVerticalScrollIndicator={false}
      refreshing={true}
      inverted={true}
      data={messagesRoom} 
      keyExtractor={(item,id) => String(id)}
      renderItem={({item}) => {
        const messageExists = item;
        return messageExists ? <CardMessage {...item}></CardMessage> : <Text></Text>;
      }}
      />
      <SendMessageBar
        onPress={() => sendMessage()}
        value={messageText}
        onChangeText={(text:any) => setMessageText(text)}
      />
    </Container>
  );
};

const mapState = (state:any) => ({
  user_access_token: state.user.user_access_token,
  profile_user: state.profile_user,
  user: state.user,
  room_selected: state.room.room_selected,
  room: state.room,
  colors_theme: state.device.colors_theme
})

const mapDispatch = {
  toggleOn: () => ({ type: 'TOGGLE_IS_ON' })
}

export default connect(mapState,mapDispatch)(Index);


