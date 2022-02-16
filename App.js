/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import {
  StatusBar,
  StyleSheet,
  I18nManager,
  BackHandler,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeAlpha from './screens/homeAlpha'
import AdminArea from './screens/adminArea'
I18nManager.forceRTL(false);
I18nManager.allowRTL(false);
import NavigationBar from 'react-native-navbar-color'

const Stack = createNativeStackNavigator()
const App = () => {

  useEffect(() => {
    const nav = [NavigationBar.setStatusBarColor('#34262f',true), NavigationBar.setStatusBarTheme('light',true), NavigationBar.setColor('#34262f')]
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress", () =>  true)
    return () => {[
                  backHandler.remove(),
                  nav
    ]}
  }, []);

  return (
    <NavigationContainer>
    {/* <StatusBar barStyle = "dark-content" hidden = {false} backgroundColor = "#fac300"/> */}
      <Stack.Navigator initialRouteName="HomeAlpha">
        <Stack.Screen
          name="HomeAlpha"
          component={HomeAlpha}
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
