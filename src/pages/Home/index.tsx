import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Gap } from '../../components';
import { getDatabase, ref, onValue } from 'firebase/database';

const Home = ({ navigation, route }) => {
  const { uid } = route.params;
  const db = getDatabase();
  const [name, setUser] = useState('');

  useEffect(() => {
    const userRef = ref(db, 'users/mahasiswa/' + uid);
    onValue(userRef, snapshot => {
      const data = snapshot.val();
      if (data && data.name) {
        setUser(data.name);
      }
    });
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.textImage1}>Selamat datang,</Text>
            <Gap height={10} />
            <Text style={styles.textImage2}>{name}</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Image
              source={require('../../assets/images/UserPhoto.png')}
              style={styles.Np}
            />
          </TouchableOpacity>
        </View>
      </View>

      <Gap height={26} />

      <View style={styles.bgContainer}>
        <ImageBackground
          source={require('../../assets/images/medis.png')}
          style={styles.medis}
        />
        <Gap height={30} />
        <View style={styles.container2}>
          <Gap height={66} />
          <TouchableOpacity
            style={styles.containerJadwal}
            onPress={() => navigation.navigate('Keluhan')}>
            <Text style={styles.text}>Ajukan Keluhan</Text>
            <Image
              source={require('../../assets/images/form.png')}
              style={styles.imJ}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.containerRm}
            onPress={() => navigation.navigate('Rekam')}>
            <Text style={styles.text}>Rekam Medis</Text>
            <Image
              source={require('../../assets/images/RM.png')}
              style={styles.imRm}
            />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 15,
    paddingTop: 30,
  },
  textContainer: {
    flex: 1,
  },
  Np: {
    width: 40,
    height: 40,
  },
  imJ: {
    width: 110,
    height: 109,
    marginLeft: 270,
    marginTop: -35,
  },
  imRm: {
    marginLeft: 270,
    marginTop: -35,
  },
  container2: {
    backgroundColor: 'white',
    width: 417,
    height: 484,
    borderRadius: 20,
  },
  containerJadwal: {
    backgroundColor: '#96C2FF',
    width: 385,
    height: 140,
    marginLeft: 13,
    borderRadius: 20,
  },
  containerRm: {
    backgroundColor: '#96C2FF',
    width: 385,
    height: 140,
    marginLeft: 13,
    marginTop: 22,
    borderRadius: 20,
  },
  medis: {
    width: 417,
    height: 233,
  },
  textImage1: {
    color: 'black',
    fontSize: 32,
    fontFamily: 'Poppins-Regular',
  },
  textImage2: {
    color: 'black',
    fontSize: 32,
    fontFamily: 'Poppins-Bold',
  },
  text: {
    color: 'white',
    fontSize: 32,
    fontFamily: 'Poppins-Bold',
    marginLeft: 30,
  },
});

export default Home;
