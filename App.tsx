import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import {createStore,applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
import Reduces from './src/redux/reducer';

import Navigations from '_navigations';
const store = createStore(Reduces,applyMiddleware(ReduxThunk));

function App() {
  return (
    <NavigationContainer>
      <Navigations />
    </NavigationContainer>
  );
}

export default function screen(){
  return(
    <Provider store={store}>
      <App/>
    </Provider>
  )
};



