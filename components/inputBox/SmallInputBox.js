import {Input} from '@rneui/themed';
import React from 'react';
import {StyleSheet} from 'react-native';

const SmallInputBox = ({onChange, placeholder, defaultValue = ''}) => {
  return (
    <Input
      defaultValue={defaultValue}
      onChangeText={onChange}
      style={styles.style}
      inputStyle={styles.inputStyle}
      inputContainerStyle={styles.inputContainerStyle}
      containerStyle={styles.containerStyle}
      placeholder={placeholder}
      keyboardType="number-pad"
      underlineColorAndroid="transparent"
    />
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    paddingHorizontal: 0,
    borderWidth: 1,
    borderColor: 'indigo',
    height: 18,
    width: '100%',
  },
  inputContainerStyle: {
    height: 18,
  },
  inputStyle: {
    textAlign: 'center',
  },
  style: {
    fontSize: 10,
  },
});

export default SmallInputBox;
