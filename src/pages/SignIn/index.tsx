import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {Gap, TextInput} from '../../components';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import {showMessage} from 'react-native-flash-message';
import {Uclinic} from '../../assets/icon';
import {getDatabase, ref, get} from 'firebase/database';

const SignIn = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassowrd] = useState('');
  const [nim, setNim] = useState('');
  
  

  const onSubmit = () => {
    if (!nim) {
      showMessage({
        message: 'NIM tidak boleh kosong',
        type: 'danger',
      });
      return;
    }
  
    // Generate pseudo email using NIM
    const pseudoEmail = `${nim}@unklab.com`;
    
  
    const auth = getAuth();
    const db = getDatabase();
  
    signInWithEmailAndPassword(auth, pseudoEmail, password) // Use pseudo email
      .then(userCredential => {
        // Signed in
        const user = userCredential.user;
  
        // Check if user exists in 'users/mahasiswa'
        const userRef = ref(db, 'users/mahasiswa/' + user.uid);
        get(userRef)
          .then(snapshot => {
            if (snapshot.exists()) {
              // User exists in 'users/mahasiswa'
              navigation.navigate('Home', {uid: user.uid});
            } else {
              // User does not exist in 'users/mahasiswa'
              showMessage({
                message: 'Access denied',
                description: 'You are not registered as a mahasiswa.',
                type: 'danger',
              });
            }
          })
          .catch(error => {
            showMessage({
              message: 'Database error',
              description: error.message,
              type: 'danger',
            });
          });
      })
      .catch(error => {
        showMessage({
          message: 'Wrong NIM or password',
          description: error.message,
          type: 'danger',
        });
      });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.contentWrapper}>
        <View style={styles.header}>
          <Uclinic />
          <Text style={styles.text}>Aplikasi klinik Universitas Klabat</Text>
        </View>
        <Gap height={26} />
        <TextInput
          label="Nim"
          placeholder="Enter you Nim"
          value={nim}
          onChangeText={value => setNim(value)}
        />
        <Gap height={26} />
        <TextInput
          label="Password"
          placeholder="Enter your password"
          value={password}
          onChangeText={value => setPassowrd(value)}
          secureTextEntry={true}
        />
        <Gap height={30} />
        <TouchableOpacity style={styles.signInButton} onPress={onSubmit}>
          <Text style={styles.signInButtonText}>Sign In</Text>
        </TouchableOpacity>
        <Gap height={10} />
        <View style={styles.signupWrapper}>
          <Text style={styles.text}>Belum punya akun? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.clickableText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    alignItems: 'center',
    marginTop: 112,
  },
  contentWrapper: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  signInButton: {
    backgroundColor: '#92BEFD',
    padding: 15,
    borderRadius: 25,
    marginTop: 41,
    width: 130,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 110,
  },
  signInButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  orText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  signupWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  text: {
    fontSize: 14,
    marginRight: 10,
    fontWeight: 'bold',
    color: '#000',
  },
  clickableText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#92BEFD',
  },
});