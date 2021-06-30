import * as React from 'react';
import { Button, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import SignIn from '_screens/Logon/SignIn';
import Home from '_screens/dashboard/Home';
import Room from '_screens/dashboard/Room/Index';
import Profile from '_screens/dashboard/Profile/index';
import CreateRoom from '_screens/dashboard/Room/CreateRoom';
import UserInformationRegistration from '_screens/Logon/UserInformationRegistration';
import EditProfile from '_screens/dashboard/Profile/EditProfile';
import Configurations from '_screens/dashboard/Configurations/index';
import { createStackNavigator } from '@react-navigation/stack';
import MyTabBar from '_components/MyDrawerBar';
import MessagesRoom from '_screens/dashboard/Room/Messages';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


function TabNav() {
  return (
      <Tab.Navigator 
      initialRouteName="Home" 
      tabBar={(props) => <MyTabBar {...props} />}>
        <Tab.Screen name="Home" component={Home} />
        {/* <Tab.Screen name="Room" component={Room} /> */}
        <Tab.Screen name="CreateRoom" component={CreateRoom} />
        <Tab.Screen name="Profile" component={Profile} />
        <Tab.Screen name="Configurations" component={Configurations} />
      </Tab.Navigator>
  );
}

function App() {
    return (
        <Stack.Navigator>
            <Stack.Screen options={{headerShown: false}} name="SignIn" component={SignIn} />
            <Stack.Screen options={{headerShown: false}} name="Room" component={Room} />
            <Stack.Screen options={{headerShown: false}} name="MessagesRoom" component={MessagesRoom} />
            <Stack.Screen options={{headerShown: false}} name="Home" component={TabNav} />
            <Stack.Screen options={{headerShown: false}} name="UserInformationRegistration" component={UserInformationRegistration} />
            <Stack.Screen options={{headerShown: false}} name="EditProfile" component={EditProfile} />
        </Stack.Navigator>
    );    
}

export default App;