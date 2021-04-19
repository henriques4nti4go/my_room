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
import ProfileImage from '_components/Profile/ProfileImage';
import ProfileInformation from '_components/Profile/ProfileInformation';
import { connect } from 'react-redux';
import {colors} from '_styles/index';
import firebase from 'firebase';

interface componentNameProps {}
interface menuElementsRoute {
    key:string;
    name:string;
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
                <ProfileImage {...profile_user} />
                <ProfileInformation {...profile_user}/>
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
                {/* <Switch value={true}  /> */}
                
            </View>
            <View
            style={{flex:2}}
            >
                <Divider />
                <ButtonPaper
                color={colors.PRIMARY} 
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
