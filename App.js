/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import Home from './src/screens/Home';
import {MyStack} from './src/routes/StackNavigator';
import {StatusBar} from 'react-native';
import {Colors} from './src/constants/ThemeConstants';

const App = () => {
  return (
    <>
      <StatusBar backgroundColor={Colors.white} barStyle="dark-content" />
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    </>
  );
};
export default App;
