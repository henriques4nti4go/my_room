import * as React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, StackActions } from '@react-navigation/native';

import SignIn from '_screens/Logon/SignIn';
import Home from '_screens/dashboard/Home';
import Room from '_screens/dashboard/Room/Index';
import Profile from '_screens/dashboard/Profile/index';
import UserInformationRegistration from '_screens/Logon/UserInformationRegistration';
import EditProfile from '_screens/dashboard/Profile/EditProfile';
import Configurations from '_screens/dashboard/Configurations/index';
import { createStackNavigator } from '@react-navigation/stack';
import MyDrawerBar from '_components/MyDrawerBar';


const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();


function DrawerNav() {
  return (
      <Drawer.Navigator initialRouteName="Home" drawerContent={(props) => <MyDrawerBar {...props} />}>
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Room" component={Room} />
        <Drawer.Screen name="Profile" component={Profile} />
        <Drawer.Screen name="Configurations" component={Configurations} />
      </Drawer.Navigator>
  );
}

function App() {
    return (
        <Stack.Navigator>
            <Stack.Screen options={{headerShown: false}} name="SignIn" component={SignIn} />
            <Stack.Screen options={{headerShown: false}} name="Room" component={Room} />
            <Stack.Screen options={{headerShown: false}} name="Home" component={DrawerNav} />
            <Stack.Screen options={{headerShown: false}} name="UserInformationRegistration" component={UserInformationRegistration} />
            <Stack.Screen options={{headerShown: false}} name="EditProfile" component={EditProfile} />
        </Stack.Navigator>
    );    
}

export default App;