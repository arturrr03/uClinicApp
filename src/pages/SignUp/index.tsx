
import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Gap, TextInput} from '../../components';
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth';
import {showMessage} from 'react-native-flash-message';
import {Uclinic} from '../../assets/icon';
import {getDatabase, ref, set} from 'firebase/database';
import { serverTimestamp } from 'firebase/database';

const SignUp = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassowrd] = useState('');
  const [nim, setNim] = useState('');
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('');
  const [address, setAddress] = useState('');
  const [desc, setDesc] = useState('');
  const [gender, setGender] = useState('');
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
  
    const data = {
      name: name,
      email: pseudoEmail, // Use pseudo email
      fullName: fullName,
      address: address,
      age: age,
      gender: gender,
      description: desc,
      createdAt: serverTimestamp(),
    };
  
    const auth = getAuth();
    const db = getDatabase();
    createUserWithEmailAndPassword(auth, pseudoEmail, password) // Use pseudo email
      .then(userCredential => {
        // Signed up
        const user = userCredential.user;
        // Write to 'users/mahasiswa' path
        set(ref(db, 'users/mahasiswa/' + user.uid), data);
        showMessage({
          message: 'Registrasi berhasil, silahkan login',
          type: 'success',
        });
        navigation.navigate('SignIn');
      })
      .catch(error => {
        const errorMessage = error.message;
        showMessage({
          message: errorMessage,
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
          label="Email"
          placeholder="Enter your email"
          value={email}
          onChangeText={value => setEmail(value)}
        />
        <Gap height={26} />
        <TextInput
          label="Username"
          placeholder="Enter your username"
          value={name}
          onChangeText = {value => setName(value)}
        />
        <Gap height={26} />
        <TextInput
          label="Password"
          placeholder="Enter your password"
          value={password}
          onChangeText={value => setPassowrd(value)}
          secureTextEntry={true}
        />
        <Gap height={26} />
        <TextInput
          label="NIM"
          placeholder="Enter your NIM"
          value={nim}
          onChangeText={value => setNim(value)}
          secureTextEntry={false}
        />

        <Gap height={30} />
        <TouchableOpacity style={styles.signInButton} onPress={onSubmit}>
          <Text style={styles.signInButtonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default SignUp;

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
    borderRadius: 20,
    marginTop: 41,
    width: 130,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 120,
  },
  signInButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Reguler',
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
  text: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: 'black',
  },
});
