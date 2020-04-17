import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Button,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  StatusBar,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import TaskList from '../components/Shared/TaskList';
import AddTask from '../components/AddTask';
import moment from 'moment';
import TextComponent from '../components/Shared/TextComponent';
import LottieAnimation from '../components/Shared/LottieAnimation';
import {LottieFile} from '../assets/lottie';
import {FontType} from '../constants/AppConstants';
import {Colors} from '../constants/ThemeConstants';

const KEY = 'TODO';

export default function Home(props) {
  const [todos, setTodos] = useState([]);
  const [ModalVisible, setModalVisible] = useState(false);
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem(KEY);
      if (value) {
        setTodos(JSON.parse(value));
        setLoading(false);
      } else {
        setLoading(false);
        // console.log('value');
      }
    } catch (e) {
      // error reading value
    }
  };

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem(KEY, value);
    } catch (e) {
      // saving error
    }
  };

  const handleAddTodo = (value) => {
    if (value.length > 0) {
      setTodos([...todos, {todo: value, completed: false, time: moment()}]);
      storeData(
        JSON.stringify([
          ...todos,
          {todo: value, completed: true, time: moment()},
        ]),
      );
    }
  };

  const handleTodoCompleted = (value, list) => {
    if (list) {
      let temp = list.map((list) => {
        if (list.todo === value) {
          return {
            ...list,
            completed: !list.completed,
          };
        } else {
          return list;
        }
      });
      setTodos(temp);
      storeData(JSON.stringify(temp));
    }
  };

  const handleRemove = (value, list) => {
    if (list) {
      let temp = list.filter((list) => list.todo !== value);
      setTodos(list.filter((list) => list.todo !== value));
      storeData(JSON.stringify(temp));
    }
  };

  const toggleModal = (value) => {
    setModalVisible(value);
  };

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={ModalVisible ? 'rgba(0,0,0,0.7)' : '#fff'}
        barStyle="dark-content"
        animated
      />
      {/* <View style={{flexDirection: 'row'}}>
        <View style={styles.divider} />
        <Text style={styles.title}>
          Todo
          <Text style={{color: '#1070de'}}> Lists</Text>
        </Text>
        <View style={styles.divider} />
      </View> */}
      <TextComponent
        style={{fontSize: 40, paddingVertical: 20, paddingLeft: 15}}>
        My Tasks
      </TextComponent>
      <View style={{flex: 1}}>
        {Loading ? (
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <ActivityIndicator size="large" color={Colors.themeBLue}/>
          </View>
        ) : (
          <ScrollView contentContainerStyle={{flexGrow: 1}}>
            {todos.length === 0 ? (
              <View
                style={{
                  flex: 1,
                }}>
                <View style={{flex: 1, alignItems: 'center'}}>
                  <View style={{height: '70%', width: '100%'}}>
                    <LottieAnimation file={LottieFile.TaskHome} />
                  </View>
                  <TextComponent type={FontType.BOLD}>
                    A fresh start
                  </TextComponent>
                  <TextComponent style={{color: Colors.textBlack}}>
                    Anything to add?
                  </TextComponent>
                </View>
              </View>
            ) : (
              todos.map((data, i) => (
                <TaskList
                  data={data}
                  key={i}
                  {...props}
                  handleRemove={handleRemove}
                  handleTodoCompleted={handleTodoCompleted}
                  list={todos}
                />
              ))
            )}
          </ScrollView>
        )}
      </View>
      {
        <View style={styles.ButtonContainer}>
          <AddTask
            handleAddTodo={handleAddTodo}
            pic="plus"
            toggleModal={toggleModal}
          />
        </View>
      }
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 10,
  },
  divider: {
    backgroundColor: '#1070de',
    height: 5,
    flex: 1,
    alignSelf: 'center',
  },
  title: {
    fontSize: 35,
    textAlign: 'center',
    paddingHorizontal: 16,
  },
  ButtonContainer: {
    alignSelf: 'stretch',
    // marginTop: 549,
  },
});
