/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  StatusBar,
  StyleSheet,
  I18nManager
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/home'
import HomeAlpha from './screens/homeAlpha'
import AdminArea from './screens/adminArea'
I18nManager.forceRTL(false);
I18nManager.allowRTL(false);

const Stack = createNativeStackNavigator()
const App = () => {

  return (
    <NavigationContainer>
    <StatusBar barStyle = "dark-content" hidden = {false} backgroundColor = "#ffffff"/>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ 
            headerShown: false 
          }}
        />
      <Stack.Screen
        name="AdminArea"
        component={AdminArea}
        options={{
          headerShown: false ,
          headerStyle: {
            backgroundColor: '#6183B4',
          }}}
      />
      </Stack.Navigator>
  </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  }
});

export default App;
