import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { getDatabase, ref, onValue } from 'firebase/database';
import { Gap } from '../../components';
import { getAuth } from "firebase/auth"; // Import Firebase Auth
import { useRoute} from '@react-navigation/native';

const DescRm = ({ navigation }) => {
  const route = useRoute();
  const auth = getAuth(); // Get the Auth instance
  const {recordId} = route.params; // Get the UID of the current user
  const db = getDatabase();
  const [fullName, setFullName] = useState();
  const [age, setAge] = useState();
  const [address, setAddress] = useState();
  const [gender, setGender] = useState();
  const [description, setDescription] = useState();
  

  useEffect(() => {
    if (recordId) { // Ensure uid is available
      const recordRef = ref(db, `users/${getAuth().currentUser?.uid}/record/${recordId}`);
      onValue(recordRef, snapshot => {
        const data = snapshot.val();
        if (data) {
          setFullName(data.fullName);
          setAge(data.age);
          setAddress(data.address);
          setGender(data.gender);
          setDescription(data.description);
        }
      });
    }
  }, [recordId]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.contentWrapper}>
        <View style={styles.rmDetail}>
          <Gap height={22} />

          <Text style={styles.label}>Nama</Text>
          <Text style={styles.value}>{fullName}</Text>
          <Gap height={15} />

          <Text style={styles.label}>Alamat</Text>
          <Text style={styles.value}>{address}</Text>
          <Gap height={15} />

          <Text style={styles.label}>Umur</Text>
          <Text style={styles.value}>{age} Tahun</Text>
          <Gap height={15} />

          <Text style={styles.label}>Gender</Text>
          <Text style={styles.value}>{gender}</Text>
          <Gap height={15} />

          <Text style={styles.label}>Deskripsi sakit atau keluhan</Text>
          <Text style={styles.description}>{description}</Text>
          <Gap height={20} />
        </View>

        <Gap height={33} />
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View style={styles.backButton}>
            <Text style={styles.backButtonText}>Kembali</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};


export default DescRm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  greeting: {
    fontSize: 32,
    fontFamily: 'Poppins-Bold',
  },
  username: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: '#007AFF',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  contentWrapper: {
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 99,
  },
  rmDetail: {
    width: '100%',
    backgroundColor: '#6DFF59', // Green background
    borderRadius: 8,
    padding: 20,
  },
  label: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: '#000',
  },

  value: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#000',
  },
  description: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#000',
  },
  status: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: '#00B900', // Green text for the status
  },
  backButton: {
    backgroundColor: '#E0E0E0',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: 'center',
  },
  backButtonText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: '#000',
  },
});
