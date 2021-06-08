import * as React  from 'react';
import { Text, View,StyleSheet,FlatList, TouchableOpacity, } from 'react-native';
import { AirbnbRating } from "react-native-elements";
import {style} from '_styles/index';
import {
  Title,
  Paragraph,
  Button,
  Drawer
} from 'react-native-paper';
import { connect } from 'react-redux';
import firebase from 'firebase';
import Data from '../../test/GenerateData';
import axios from 'axios';
import { endpoints } from '_config/endpoints';
import Card from '_components/organisms/Card';
import ActivityIndicator  from '_components/ActivityIndicator';



let data = new Data(5).returnData();

interface componentNameProps {
  navigation:any;
  user_access_token:string;
  setRoomSelected:Function
}


const Index = (props: componentNameProps) => {
  const [rooms,setRooms] = React.useState([]);
  const [loading,setIsLoading] = React.useState(true);
  React.useEffect(() => {
    getRooms();
  },[]);

  function RoomContent(item:any) {
    return (
      <TouchableOpacity
      onPress={() => {
        props.setRoomSelected(item.id)
        props.navigation.navigate('MessagesRoom')
      }}
      style={{minHeight:150}}
      >
        <View>
          <Text style={{fontSize:30}}>
            {item.roomDetails.title}
          </Text>
        </View>
        <View style={{justifyContent: 'space-between',flexDirection: 'row'}}>
          <Text>pessoas</Text>
          <Text>5,1</Text>
        </View>
      </TouchableOpacity>
    );
  }

  async function getRooms() {
    
    setIsLoading(true)
    try {
      const {data} = await axios({
        url: endpoints.room.get_rooms,
        method: 'POST',
        headers: {
          "token": props.user_access_token
        }
      })
      if (!data.error) setRooms(data.response.rooms);
      
    } catch (error:any) {
      error.response.data
    }
    setIsLoading(false);
  }

  if (loading) return <ActivityIndicator />

  return (
    <View
    style={[
      style.body,
      style.container,
    ]}
    >
      { rooms!= null 
      && rooms.length > 0
      &&
      <FlatList 
      data={rooms}
      keyExtractor={(item,id) => String(id)}
      renderItem={({item}) => <Card><RoomContent {...item} /></Card>}
      />
      }
    </View>
  );
  return (
    <View style={[
        style.container,
        style.body
    ]}>
      <View>
        <Button onPress={() => firebase.auth().signOut()}>sair</Button>
      </View>
      <View style={[
        style.align,
      ]}>
        <FlatList
          style={[
            {
              width: '100%',
            }
          ]}
          keyExtractor={(item,index) => index.toString()}
          data={data}
          renderItem={({item}) => {
            
            return (
              <TouchableOpacity
              onPress={() => props.navigation.navigate('Room')}
              >
                <Card style={[
                  style.width,
                  {
                    alignSelf: 'center',
                    marginBottom: 20,
                  }
                ]}>
                  <Card.Title title={item.name} subtitle="Card Subtitle" />
                  <Card.Content>
                    <Title>😀</Title>
                    <Paragraph>Card content</Paragraph>
                  </Card.Content>
                  {/* <Card.Cover source={{ uri: 'https://picsum.photos/700' }} /> */}
                  <Card.Actions>
                    <Button>Entrar</Button>
                    {/* <Button>Cancel</Button> */}
                    
                    <AirbnbRating
                      count={5}
                      reviews={[1,2,3,4,5]}
                      defaultRating={1}
                      size={20}
                    />
                  </Card.Actions>
                </Card>
              </TouchableOpacity>
            );
          }}
          />
      </View>
    </View>
  );
};

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

