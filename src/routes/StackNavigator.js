import React from 'react';
import {
  createStackNavigator,
  TransitionSpecs,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import Home from '../screens/Home';
import TaskDetails from '../screens/TaskDetails';
const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      headerMode="none"
      screenOptions={{
        cardOverlayEnabled: true,
        cardStyleInterpolator: ({current: {progress}}) => ({
          cardStyle: {
            opacity: progress.interpolate({
              inputRange: [0, 0.5, 0.9, 1],
              outputRange: [0, 0.25, 0.7, 1],
            }),
          },
        }),
      }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen
        name="TaskDetails"
        component={TaskDetails}
        // options={{
        //   cardStyleInterpolator: CardStyleInterpolators.forRevealFromBottomAndroid,
        // }}
      />
    </Stack.Navigator>
  );
}

export {MyStack};
