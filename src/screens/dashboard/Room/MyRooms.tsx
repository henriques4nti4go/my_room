import * as React from 'react';
import { Text, View, StyleSheet, FlatList, Image, Alert } from 'react-native';
import Container from '_components/Container';
import {connect} from 'react-redux';
import {style} from '_styles/';
import ActivityIndicator from '_components/ActivityIndicator';
import axios from 'axios';
import { endpoints } from '_config/endpoints';
import {Icon} from 'react-native-elements';
import Button from '_components/Button';
import Modal from '_components/Modal';
import TextInput from '_components/TextInput';

interface componentNameProps {
    colors_theme: any;
    user_access_token: string;
    user_id: number;
    navigation:any;
}

const componentName = (props: componentNameProps) => {
    const [loading,setIsLoading] = React.useState(true);
    const [myRooms,setMyrooms] = React.useState([]);
    const [visibleModal,setVisibleModal] = React.useState(false);
    const [compModal,setCompModal] = React.useState(<Text>alskda</Text>);
    React.useEffect(() => {
        
    },[])

    React.useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            getMyRooms();
        });
    },[props.navigation])

    function HeaderMyRoom() {
        return <Text style={[{color: props.colors_theme.FONT_COLOR,fontSize:25,fontWeight:'bold'}]}>Minhas Salas</Text>
    }

    function DeleteRoom(item:any) {
        async function deleteRoomRequest() {
            setIsLoading(true);
            try {
                let {data} = await axios({
                    method:'POST',
                    url: endpoints.room.delete,
                    headers: {
                        token: props.user_access_token
                    },
                    data: {
                        user_id:props.user_id,
                        room_id: item.id
                    }
                })
                if (!data.error) Alert.alert('Successo!','Sala apagada com sucesso.');
            } catch (error) {
                Alert.alert('Erro!','Ocorreu um erro em apagar a sala');
            }
            setIsLoading(false)
        }
        return (
            <View>
                <View style={{marginTop:10}}>
                    <Text style={{color:props.colors_theme.FONT_COLOR}}>Você tem certeza? essa operação nao pode ser desfeita.</Text>
                </View>
                <View style={{marginTop:10}}>
                    <Button
                    style={{backgroundColor:'#e74c3c'}}
                    onPress={async () => {
                        await deleteRoomRequest();
                        await getMyRooms();
                        setVisibleModal(false)
                    }}
                    >
                        Apagar
                    </Button>
                </View>
            </View>
        );
    }

    function EditRoom(item:any) {
        const [titleRoom,setTitleRoom] = React.useState(item.roomDetails.title);
        const [descriptionRoom,setDescriptionRoom] = React.useState(item.roomDetails.description);
        async function updateRoom() {
            setIsLoading(false)
            try {
                let {data} = await axios({
                    url:endpoints.room.update,
                    method: 'POST',
                    headers: {
                        token:props.user_access_token,
                    },
                    data: {
                        user_id: props.user_id,
                        title: titleRoom,
                        description: descriptionRoom,
                        room_id: item.id 
                    }
                })
                if (!data.error) Alert.alert('Sucesso!','Sala Atualizada com sucesso.');
            } catch (error) {
                console.log(error.response.data)
                Alert.alert('Erro!','Não foi possivel atualizar as informações da sala');
            }
            setIsLoading(false)
        }
        return (
            <View>
                <View>
                    <Text style={{color:props.colors_theme.FONT_COLOR,fontWeight:"bold",fontSize:25}}>Editar Sala</Text>
                </View>
                <View style={{marginBottom:10}}>
                    <View style={{marginBottom:10}}>
                        <View>
                            <Text style={{color:props.colors_theme.FONT_COLOR,fontWeight:"bold"}}>Nome da sala:</Text>
                        </View>
                        <View>
                            <TextInput value={titleRoom} nameIcon='door-open' onChangeText={(text:string) => setTitleRoom(text) } typeIcon='font-awesome-5' />
                        </View>
                    </View>
                    <View style={{marginBottom:10}}>
                        <View>
                            <Text style={{color:props.colors_theme.FONT_COLOR,fontWeight:"bold"}}>Descrição:</Text>
                        </View>
                        <View>
                            <TextInput value={descriptionRoom} nameIcon='book' onChangeText={(text:string) => setDescriptionRoom(text) } typeIcon='font-awesome-5' />
                        </View>
                    </View>
                    <View style={{marginBottom:10}}>
                        <View>
                            <Button onPress={async() => {
                                await updateRoom();
                                await getMyRooms();
                                setVisibleModal(false)
                            }}>Atualizar</Button>
                        </View>
                    </View>
                </View>
            </View>
        );
    }

    function MyRoomsComponent(item:any) {
        return (
            <View style={[style.card,{backgroundColor:props.colors_theme.SECONDARY,flexDirection:'row',marginBottom:10}]}>
                <View style={[style.shadowBox,{backgroundColor:'white',width:50,height:50,justifyContent:'center',alignItems:'center',borderRadius:50,marginRight:10}]}>
                    {/* <Image source={{uri:item}} /> */}
                    <Icon name='door-open' type='font-awesome-5'  />
                </View>
                <View style={{flex:1}}>
                    <Text style={[{color:props.colors_theme.FONT_COLOR,fontWeight:'bold'}]}>{item.roomDetails.title}</Text>
                    <Text style={[{color:props.colors_theme.FONT_COLOR}]}>{item.roomDetails.description}</Text>
                </View>
                <View>
                    <View style={{marginBottom:10}}>
                        <Button 
                        onPress={() => {
                            setCompModal(<EditRoom {...item}/>)
                            setVisibleModal(true)
                        }}
                        style={{backgroundColor:'#3498db',}}>
                            <View style={{flexDirection:'row'}}>
                                    <Icon color='white' name='edit' size={20} type='font-awesome-5' />
                                    <Text style={{marginLeft:10,color:'white',fontWeight:'bold'}}>Editar</Text>
                                </View>
                        </Button>
                    </View>
                    <View style={{marginBottom:10}}>
                        <Button 
                        onPress={() => {
                            setCompModal(<DeleteRoom {...item} />)
                            setVisibleModal(true)
                        }}
                        style={{backgroundColor:'#e74c3c'}}>
                            <View style={{flexDirection:'row'}}>
                                <Icon color='white' name='times' size={20} type='font-awesome-5' />
                                <Text style={{marginLeft:10,color:'white',fontWeight:'bold'}}>Apagar</Text>
                            </View>
                        </Button>
                    </View>
                </View>
                <Modal
                visible={visibleModal}
                close={() => setVisibleModal(false)}
                >
                    {compModal}
                </Modal>
            </View>
        );
    }

    /**
     * request for get rooms user
     */
    async function getMyRooms() {
        setIsLoading(true)
        try {
            
            let {data} = await axios({
                method: 'POST',
                headers: {
                    token: props.user_access_token
                },
                url: endpoints.room.my_rooms,
                data: {
                    user_id: props.user_id
                }
            })
            if (!data.error) setMyrooms(data.response.room)
        } catch (error) {
            
        }
        setIsLoading(false)
    }

    if (loading) return <ActivityIndicator /> 

    return (
        <Container
        navigation={props.navigation}
        header={<HeaderMyRoom />}
        >
            {
                myRooms.length > 0 ?
                <FlatList 
                showsVerticalScrollIndicator={false}
                data={myRooms}
                renderItem={({item}) => <MyRoomsComponent {...item} /> }
                keyExtractor={(item,id) => String(id)}
                />:
                <View style={[style.card,{backgroundColor:props.colors_theme.SECONDARY}]}>
                    <Text style={{color:props.colors_theme.FONT_COLOR,fontWeight:'bold'}}>Você não tem nenhuma sala criada.</Text>
                </View>
            }
        </Container>
    );
};


const mapState = (state:any) => ({
    user_access_token: state.user.user_access_token,
    profile_user: state.profile_user,
    device_theme: state.device.device_theme,
    colors_theme: state.device.colors_theme,
    user_id: state.user.user_id
  })

const mapDispatch = (dispatch:any) => {
    return {
      setRoomSelected: (value:string) =>{ dispatch({
        payload:{
            room_selected:value
        },
        type:'ROOM_SELECTED'
      })},
      setAppTheme: (value: object) => { dispatch({
        payload: value,
        type: 'APP_THEME',
    })}
    }
  }
  
  export default connect(mapState,mapDispatch)(componentName);

const styles = StyleSheet.create({
  container: {}
});
