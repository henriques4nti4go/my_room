import * as React  from 'react';
import { Text, View,StyleSheet,FlatList, TouchableOpacity, } from 'react-native';
import { AirbnbRating } from "react-native-elements";
import {style} from '_styles/';
import {
  Title,
  Paragraph,
  Button,
  Drawer
} from 'react-native-paper';
import { connect } from 'react-redux';
import firebase from 'firebase';
import axios from 'axios';
import { endpoints } from '_config/endpoints';
import Card from '_components/organisms/Card';
import ActivityIndicator  from '_components/ActivityIndicator';
import CardsRoom from '_components/CardsRoom';
import {colors} from '_styles/'
import Container from '_components/Container';
interface componentNameProps {
  navigation:any;
  user_access_token:string;
  setRoomSelected:Function;
  device_theme: string;
  colors_theme: any
}


const Index = (props: componentNameProps) => {
  const [rooms,setRooms] = React.useState([]);
  const [loading,setIsLoading] = React.useState(true);
  const {
    PRIMARY,
    SECONDARY,
    FONT_COLOR,
    BACKGROUND_VIEW
  } = colors(props.device_theme);

  React.useEffect(() => {
    getRooms();
  },[]);

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
    <Container>
      <View style={{
        backgroundColor: props.colors_theme.SECONDARY,
        paddingHorizontal:10,
        paddingVertical:10,
        marginTop:10,
        borderRadius:5,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        }}>
        <Text style={{color:props.colors_theme.FONT_COLOR}}>Encontre uma sala que mais <Text style={{color:props.colors_theme.PRIMARY,fontWeight:'bold'}}>combina</Text> com você</Text>
      </View>
      <CardsRoom navigation={props.navigation} data={rooms} />
    </Container>
  );
};

const mapState = (state:any) => ({
  user_access_token: state.user.user_access_token,
  profile_user: state.profile_user,
  device_theme: state.device.device_theme,
  colors_theme: state.device.colors_theme
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

