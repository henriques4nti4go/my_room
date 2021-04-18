import * as React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, Button  } from 'react-native';
import {
    Icon,
} from 'react-native-elements';
import {
    Divider,
    Button as ButtonPaper,
    Switch
} from 'react-native-paper';

import { connect } from 'react-redux';

import firebase from 'firebase';

interface componentNameProps {}
interface menuElementsRoute {
    key:string;
    name:string;
}

const ProfileImage = (profile_user:any) => {
    let {
        profile_photo,
    } = profile_user;
    console.log(profile_photo)
    if (!profile_photo) {
        return (
            <Image
            style={{
                width: 85,
                height: 85,
            }}
            source={require('_assets/profile-user.png')}
            />
        );
    }

    return (
        <Image
        style={{
            width: 85,
            height: 85,
        }}
        source={{uri: profile_user.profile_photo}}
        />
    );
} 

const componentName = ({navigation,state,profile_user}:any) => {
    
    let {
        name,
        user_name,
    } = profile_user;
    
    return (
        <View style={styles.container}>
            <View
            style={{
                backgroundColor: '#d6d6d6',
                justifyContent: 'center',
                alignItems: 'center',
                flex:4
            }}
            >
                <View
                style={{
                    borderWidth: 1,
                    borderColor: 'rgba(1,1,1,0.1)',
                    borderRadius: 100,
                    padding: 5,
                    backgroundColor: 'white'
                }}
                >
                    <ProfileImage {...profile_user} />
                </View>
                <Text>Hi, {name}!</Text>
                <Text style={{fontWeight: 'bold'}}>@{user_name}</Text>
            </View>
            <View
            style={{flex:6}}
            >
                <MenuOptions {...{navigation,state}} />
            </View>
            <View
            style={{
                flex: 1
            }}
            >
                <Switch value={true}  />
                
            </View>
            <View
            style={{flex:2}}
            >
                <Divider />
                <ButtonPaper
                color='red' 
                mode='text' 
                onPress={() => {
                    firebase.auth().signOut().then((res) => {
                        navigation.navigate('SignIn')
                    })
                }}
                icon={require('_assets/icons/logout.png')} 
                contentStyle={{justifyContent:'flex-start'}}
                >Sair</ButtonPaper>
            </View>
        </View>
    );
};



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
  })
  
  const mapDispatch = {
  }
  
export default connect(mapState,mapDispatch)(componentName);


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
