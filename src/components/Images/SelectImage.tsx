import * as React from 'react';
import { Text, View,Image, TouchableOpacity,Platform,Button } from 'react-native';
import { Icon } from 'react-native-elements';
import {connect} from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { endpoints } from '_config/endpoints';

interface iProps {
    colors_theme?: any;
    profile_user?:any;
    user_access_token: string;
    user_id:string;
};

function index(props: iProps) {
    console.log(props.profile_user)
    const [image, setImage] = React.useState(props.profile_user.profile_photo ? {uri:props.profile_user.profile_photo} : require('_assets/profile-user.png'));

    React.useEffect(() => {
      (async () => {
        if (Platform.OS !== 'web') {
          const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
          if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
          }
        }
      })();
    }, []);
  
    function getExtFile(uri:string) {
        return uri.substring(uri.lastIndexOf('.')+1,uri.length)
    }

    const pickImage = async () => {
      let result:any = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      if (!result.cancelled) {
        try {
            var form = new FormData();
            let type_file:any = {
                jpg:'image/jpeg',
                jpeg:'image/jpeg',
                png:'image/png',
                pdf:'application/pdf',
                doc:'application/doc',
            };
        
            let file:any = {
                name: 'file',
                type: type_file[getExtFile(result.uri)],
                uri: result.uri
            };
            // form.append(`anexo${index}`,file);
            form.append('user_id',props.user_id)
            form.append('file', file);

            let {data} = await axios({
                method:'POST',
                url: endpoints.user.update_profile_photo,
                headers:{
                'Content-Type': 'multipart/form-data',
                'token': props.user_access_token
                },
                data: form
            }); 
            console.log(data)  
        } catch (error:any) {
            console.log(error.response.data)  
        } 
      }
        // setImage(result.uri)

    };

    return (
        <View>
            <TouchableOpacity style={{flexDirection:'row',paddingVertical:10}} onPress={pickImage}>
                <View style={{backgroundColor:'white',borderRadius:100,paddingVertical:1,paddingHorizontal:1}}>
                    <Image  source={image} style={[{width:70,height:70,borderRadius:100,zIndex:1}]}/>
                </View>
                <Icon style={{top:45}} color={props.colors_theme.FONT_COLOR} type='font-awesome-5' name='edit'/>
            </TouchableOpacity>
        </View>
    );
}

const mapState = (state:any) => ({
    user_access_token: state.user.user_access_token,
    profile_user: state.profile_user,
    user_id: state.user.user_id,
    colors_theme: state.device.colors_theme
  })
  
  const mapDispatchToProp = ( dispatch:any ) => {
      return{
        updateImageProfile:(value:any) => {
            dispatch({
                action:'UPDATE_IMAGE_PROFILE',
                payload: {uri: value}
            });
        }
      }
  }
  
  export default connect(mapState,mapDispatchToProp)(index);