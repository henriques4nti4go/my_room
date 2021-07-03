import * as React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, Button  } from 'react-native';
import {
    Icon,
} from 'react-native-elements';
import ProfileImage from '_components/Profile/ProfileImage';
import ProfileInformation from '_components/Profile/ProfileInformation';
import { connect } from 'react-redux';
import {colors,style} from '_styles/index';
import firebase from 'firebase';

interface componentNameProps {}
interface menuElementsRoute {
    key:string;
    name:string;
    colors_theme:any
}

const TabBar = (props:any) => {
    const { navigationState, navigation, position,state } = props
    
    return (
      <View style={[
        {
            height: 55,
            backgroundColor: props.colors_theme.SECONDARY,
            flexDirection: "row",
            justifyContent: 'space-around',
            alignItems: 'center',
        },
        style.shadowBox
      ]}>
      {state.routes.map((route:any, index:any) => {
        let iconName = 'home';
        let typeIcon;
        switch (route.name) {
            case 'Home':
                iconName = 'home';
                typeIcon = 'font-awesome-5';
                break;
            case 'Room':
                iconName = 'door-open';
                typeIcon = 'font-awesome-5';
                break;
            case 'Profile':
                iconName = 'user';
                typeIcon = 'font-awesome';
                break;
            case 'Configurations':
                iconName = 'cog';
                typeIcon = 'font-awesome-5';
                break;   
            case 'CreateRoom':
                iconName = 'plus';
                typeIcon = 'font-awesome-5';
                break;     
            case 'MyRooms':
                iconName = 'person-booth';
                typeIcon = 'font-awesome-5';
                break;     
            default:
                break;
        } 

        return (
            <TouchableOpacity
            key={index}
            onPress={() => navigation.navigate(route.name)}
            >
                <Icon name={iconName} type={typeIcon} color={props.colors_theme.PRIMARY} />
            </TouchableOpacity>
        )
      })}
      </View>
    )
  }

{/* <ButtonPaper
                color={colors.PRIMARY} 
                mode='text' 
                onPress={() => {
                    firebase.auth().signOut().then((res) => {
                        navigation.navigate('SignIn')
                    })
                }}
                icon={require('_assets/icons/logout.png')} 
                contentStyle={{justifyContent:'flex-start'}}
                >Sair</ButtonPaper> */}


function MenuOptions({navigation,state}:any) {
    const icons_name:{
        home:string,
        room:string,
        profile:string,
        configurations:string,
    } = {
        home: 'home',
        room: 'door-open',
        profile: require('_assets/icons/user.png'),
        configurations: 'cog'
    };

    const current_route:string = state.routeNames[state.index];

    return state.routes.map(({key,name}:menuElementsRoute) => {
        return (
            <ButtonPaper
            icon={icons_name[name.toLowerCase()]} 
            mode='text'
            color={colors.PRIMARY}
            disabled={name == current_route}
            key={key}
            contentStyle={{justifyContent: 'flex-start'}}
            onPress={() => navigation.navigate(name) }>
                {name}
            </ButtonPaper>
        );
    })
    
}

const mapState = (state:any) => ({
    profile_user: state.profile_user,
    colors_theme: state.device.colors_theme
  })
  
  const mapDispatch = {
  }
  
export default connect(mapState,mapDispatch)(TabBar);


const styles = StyleSheet.create({
    container: {
        marginTop:25,
        flex:1
    },
    buttonStyle: {
        height: 30,
        marginTop: 5,
        marginBottom:5,
        flexDirection: 'row',
        alignItems: 'center'
    }
});
