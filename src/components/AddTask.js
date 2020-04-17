import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  KeyboardAvoidingView,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome5';
import Modal from 'react-native-modal';

import TextComponent from './Shared/TextComponent';
import TextInputComponent from './Shared/TextInputComponent';
import {FontType, IconType} from '../constants/AppConstants';
import IconComponent from './Shared/IconComponent';
import {Colors} from '../constants/ThemeConstants';

export default ({pic, handleAddTodo, toggleModal, handleClear, list}) => {
  const [modal, setModal] = useState(false);
  const [value, setValue] = useState('');

  const handleClose = () => {
    setModal(false);
    setValue('');
    toggleModal(false);
  };

  return (
    <View
      style={{
        backgroundColor: 'white',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 50,
        elevation: 5,
      }}>
      <View />
      <View>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            setModal(true);
            toggleModal(true);
          }}
          style={styles.ButtonAdd}>
          <IconComponent
            name={pic}
            type={IconType.Feather}
            size={30}
            color={Colors.themeBLue}
          />
        </TouchableOpacity>
      </View>
      <View />
      <Modal
        animationIn="fadeIn"
        animationOut="fadeOut"
        backdropOpacity={0}
        onBackdropPress={handleClose}
        onBackButtonPress={handleClose}
        style={styles.modal}
        isVisible={modal}>
        <View style={styles.filerOptionContainer}>
          <KeyboardAvoidingView behavior="padding" enabled>
            <TextInputComponent
              style={styles.input}
              placeholder="New task"
              autoFocus
              multiline={true}
              onChangeText={(value) => setValue(value)}
              value={value}
            />
          </KeyboardAvoidingView>
          <View style={{flex: 1}} />
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TouchableOpacity
              disabled={list.length === 0}
              onPress={handleClear}
              style={styles.btnBottom}>
              <View style={styles.Text}>
                <TextComponent
                  type={FontType.BOLD}
                  style={[
                    styles.textSave,
                    {color: list.length !== 0 ? '#1070de' : 'lightgrey'},
                  ]}>
                  Clear all
                </TextComponent>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              disabled={!value}
              onPress={() => {
                handleClose();
                handleAddTodo(value);
              }}
              style={styles.btnBottom}>
              <View style={styles.Text}>
                <TextComponent
                  type={FontType.BOLD}
                  style={[
                    styles.textSave,
                    {color: value ? '#1070de' : 'lightgrey'},
                  ]}>
                  Save
                </TextComponent>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  ButtonAdd: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    shadowColor: 'white',
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 1.43,
    shadowRadius: 19.51,
    elevation: 10,
    marginBottom: 40,
    // position: 'absolute',
    // top: -25,
    // left:0
  },
  modal: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'flex-end',
    margin: 0,
  },
  filerOptionContainer: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height / 5,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  input: {
    padding: 10,
    fontSize: 14,
  },
  btnBottom: {
    padding: 15,
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
  },
  textSave: {
    fontSize: 20,
    color: '#1070de',
  },
  Text: {
    // paddingLeft: 330,
  },
});
