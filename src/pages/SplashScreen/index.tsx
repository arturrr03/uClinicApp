import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import Uclinic from '../../assets/icon/Uclinic.svg';


const SplashScreen = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('SignIn');
    }, 5000);
  }, []);

  return (
    <View style={styles.container}>
      <Uclinic />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'ffffff',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
