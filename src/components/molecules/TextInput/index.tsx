import {StyleSheet, Text, View, TextInput as Input} from 'react-native';
import React from 'react';

const TextInput = ({label, placeholder, ...rest}) => {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <Input style={styles.input} placeholder={placeholder} {...rest} />
    </View>
  );
};

export default TextInput;

const styles = StyleSheet.create({
  label: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#000',
    marginLeft: 15,
  },
  input: {
    fontFamily: 'Poppins-SemiRegular',
    fontSize: 12.5,
    borderRadius: 40,
    padding: 12.5,
    backgroundColor: '#CECECE',
  },
});
