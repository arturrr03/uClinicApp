import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Gap } from '../../components';
import { getDatabase, ref, onValue } from "firebase/database";
import { getAuth } from "firebase/auth"; // Import Firebase Auth

const Profile = ({ navigation }) => {

  const auth = getAuth(); // Get the Auth instance
  const uid = auth.currentUser?.uid; // Get the UID of the current user
  const db = getDatabase();
  const [name, setUser] = useState();
  const [email, setEmail] = useState();

  useEffect(() => {
    if (uid) { // Ensure uid is available
      const userRef = ref(db, 'users/' + uid);
      onValue(userRef, snapshot => {
        const data = snapshot.val();
        setUser(data?.name); // Optional chaining in case data is null
        setEmail(data?.email);
      });
    }
  }, []);
  return (
    <ScrollView>
      <View style={styles.container}>
        {/* Header with Back Button */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backText}>Kembali</Text>
          </TouchableOpacity>
        </View>

        {/* Profile Image */}
        <View style={styles.profileContainer}>
          <Image
            source={require('../../assets/images/UserPhoto.png')}
            style={styles.profileImage}
          />
        </View>

        {/* Name and Email */}
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Nama</Text>
          <View style={styles.row}>
            <Text style={styles.infoText}>{name}</Text>
            <TouchableOpacity>
              <Text style={styles.editText}>Ubah</Text>
            </TouchableOpacity>
          </View>

          <Gap height={10} />

          <Text style={styles.label}>Email</Text>
          <Text style={styles.infoText}>{email}</Text>
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => navigation.navigate('SplashScreen')}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#F7F8FA',
  },
  header: {
    marginTop: 40,
  },
  backText: {
    color: 'black',
    fontSize: 18,
    fontFamily: 'Poppins - Regular',
  },
  profileContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  infoContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  label: {
    fontSize: 18,
    color: 'black',
    fontFamily: 'Poppins - Regular',
  },
  infoText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 5,
    marginLeft: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  editText: {
    color: '#4C8BF5',
    fontSize: 14,
  },
  logoutButton: {
    marginTop: 400,
    backgroundColor: '#E5E5E5',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutText: {
    fontSize: 16,
    color: 'black',
  },
});

export default Profile;
