import * as React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, StackActions } from '@react-navigation/native';

import SignIn from '_screens/logon/SignIn';
import Home from '_screens/dashboard/Home';
import Room from '_screens/dashboard/Room/Index';
import { createStackNavigator } from '@react-navigation/stack';


const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
function CustomDrawerContent({ navigation }) {
  
  return (
    <Button
      title="Go somewhere"
      onPress={() => {
        // Navigate using the `navigation` prop that you received
        navigation.navigate('Home');
      }}
    />
  );
}


function DrawerNav() {
  return (
      <Drawer.Navigator initialRouteName="Home" drawerContent={(props) => <CustomDrawerContent {...props} />}>
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Room" component={Room} />
      </Drawer.Navigator>
  );
}

function App() {
    return (
        <Stack.Navigator>
            <Stack.Screen options={{headerShown: false}} name="SignIn" component={SignIn} />
            <Stack.Screen options={{headerShown: false}} name="Room" component={Room} />
            <Stack.Screen options={{headerShown: false}} name="Home" component={DrawerNav} />
        </Stack.Navigator>
    );    
}

export default App;