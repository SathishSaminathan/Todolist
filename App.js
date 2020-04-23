/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import codePush from 'react-native-code-push';

import Home from './src/screens/Home';
import {MyStack} from './src/routes/StackNavigator';
import {StatusBar} from 'react-native';
import {Colors} from './src/constants/ThemeConstants';

// Is CN=SathishSaminathan, OU=SKTech, O=SKTech, L=Tirupur, ST=Tamilnadu, C=IN correct?
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

const codePushOptions = {checkFrequency: codePush.CheckFrequency.ON_APP_START};
// appcenter codepush release-react -a SathishSaminathan/Simple-Todo-List -d Production
export default codePush(codePushOptions)(App);
