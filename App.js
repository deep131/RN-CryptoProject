import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Home from './Screens/Home';

import Market from './Screens/Market';

import Profile from './Screens/Profile';

import Tabs from './Navigation/tabs';
import MainLayout from './Screens/MainLayout';
import Portfolio from './Screens/Portfolio';
import{createStore,applyMiddleware} from 'redux'
import {Provider } from 'react-redux'
import thunk from "redux-thunk"
import rootReducer from './store/tab/rootReducer';
const App = () => {
  const Stack = createStackNavigator();
const store=createStore(
  rootReducer,applyMiddleware(thunk)
)

  const AppNavigator = createStackNavigator();
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{headerShown: false}}
          name="Tabs"
          component={Tabs}
        ></Stack.Screen>

        <Stack.Screen
          options={{headerShown: false}}
          name="Home"
          component={Home}
        ></Stack.Screen>

        <Stack.Screen
          options={{headerShown: false}}
          name="Market"
          component={Market}
        ></Stack.Screen>
        <Stack.Screen
          options={{headerShown: false}}
          name="Portfoio"
          component={Portfolio}
        ></Stack.Screen>
        <Stack.Screen name="Profile" component={Profile}></Stack.Screen>
        <Stack.Screen name="MainLayout" component={MainLayout}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
};
export default App;
