import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SignIn from '_screens/logon/SignIn';
import Home from '_screens/dashboard/Home';
import Room from '_screens/dashboard/Room/Index';

const Stack = createStackNavigator();


function App() {
    return (
        <Stack.Navigator>
            <Stack.Screen options={{headerShown: false}} name="SignIn" component={SignIn} />
            <Stack.Screen options={{headerShown: false}} name="Room" component={Room} />
            <Stack.Screen options={{headerShown: false}} name="Home" component={Home} />
        </Stack.Navigator>
    );    
}

export default App;


