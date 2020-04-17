import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import moment from 'moment';

import TextComponent from './TextComponent';
import IconComponent from './IconComponent';
import {Colors} from '../../constants/ThemeConstants';
import {IconType} from '../../constants/AppConstants';

const Task = ({navigation, data, list, handleTodoCompleted, handleRemove}) => (
  <View style={styles.taskWrapper}>
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() => navigation.navigate('TaskDetails')}
      style={{flex: 1}}>
      <View style={{flexDirection: 'row', flex: 1}}>
        <View
          style={{
            flex: 2,
            justifyContent: 'space-around',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => handleTodoCompleted(data.todo, list)}
            style={{flex: 1, justifyContent: 'center'}}>
            <IconComponent
              type={IconType.MaterialCommunityIcons}
              name={
                data.completed
                  ? 'check-circle-outline'
                  : 'checkbox-blank-circle-outline'
              }
              style={{fontSize: 25, color: Colors.themeBlack}}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.task}>
          <TextComponent
            style={[
              styles.Texttask,
              data.completed && {textDecorationLine: 'line-through'},
            ]}>
            {data.todo}
          </TextComponent>
          <TextComponent
            style={[styles.Texttask, {color: Colors.searchText, fontSize: 12}]}>
            {moment(data.time).fromNow()}
          </TextComponent>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'space-around',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => handleRemove(data.todo, list)}
            style={{flex: 1, justifyContent: 'center'}}>
            <IconComponent
              type={IconType.MaterialCommunityIcons}
              name="delete-outline"
              style={{fontSize: 25, color: Colors.searchText}}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  </View>
);
export default Task;
const styles = StyleSheet.create({
  taskWrapper: {
    // marginTop: '4%',
    flexDirection: 'row',
    borderColor: 'gray',
    borderBottomWidth: 1,
    borderBottomColor: Colors.accDividerColor,
    width: '100%',
    alignItems: 'stretch',
    minHeight: 40,
    justifyContent: 'space-between',
    // paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: Colors.white,
  },
  Texttask: {
    // paddingBottom: 20,
    // paddingLeft: 10,
    borderColor: '#F0F0F0',
    fontSize: 16,
    // fontWeight: 'bold',
    color: 'black',
  },
  task: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    flex: 7,
  },
});
