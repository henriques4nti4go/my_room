import axios from 'axios';
import * as React from 'react';
import { Text, View, StyleSheet, ScrollView,FlatList,TextInput, TouchableOpacity , Image} from 'react-native';
import {connect} from 'react-redux';
import SendMessageBar from '_components/molecules/SendMessageBar';
import ActivityIndicator from '_components/ActivityIndicator'
import { endpoints } from '_config/endpoints';
import { style } from '_styles/';
import {PRIMARY,GRAY,FONT_COLOR} from '_config/colors';
import { ProcessDate } from '../../../utils';
import WebSocketClass from '../../../classes/WebSocket.class';
import { cos } from 'react-native-reanimated';
interface RoomMessagesProps {
  navigation:any;
  user_access_token:string;
  room_selected:string;
  user:any
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
  if (loading) return <ActivityIndicator />
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


