import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {Colors} from '../constants/ThemeConstants';

export default class TaskDetails extends Component {
  render() {
    return (
      <View style={{backgroundColor: Colors.white, flex: 1}}>
        <Text> TaskDetails </Text>
      </View>
    );
  }
}
