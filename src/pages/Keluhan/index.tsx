import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { getDatabase, ref, set, push } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { serverTimestamp } from 'firebase/database';
import FlashMessage, { showMessage } from 'react-native-flash-message';

const Keluhan = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('');
  const [address, setAddress] = useState('');
  const [gender, setGender] = useState('');
  const [description, setDescription] = useState('');
  const [charCount, setCharCount] = useState(200);

  const handleDescriptionChange = (text) => {
    setDescription(text);
    setCharCount(200 - text.length);
  };

  const onSubmit = () => {
    // Validation to check if all fields are filled
    if (!fullName || !age || !address || !gender || !description) {
      showMessage({
        message: 'Data incomplete',
        description: 'Lengkapi form',
        type: 'danger',
      });
      return;
    }

    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const db = getDatabase();
      const recordRef = ref(db, `users/${user.uid}/record`);
      const recordData = {
        fullName,
        age,
        address,
        gender,
        description,
        createdAt: serverTimestamp(),
      };

      // Using push to create a unique key for each record entry
      const newRecordRef = push(recordRef);
      set(newRecordRef, recordData)
        .then(() => {
          showMessage({
            message: 'Success',
            description: 'Data successfully submitted!',
            type: 'success',
          });
          navigation.goBack();
        })
        .catch((error) => {
          showMessage({
            message: 'Submission failed',
            description: error.message,
            type: 'danger',
          });
        });
    } else {
      showMessage({
        message: 'User not logged in',
        description: 'Please log in to submit a complaint.',
        type: 'danger',
      });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>
        Formulir <Text style={styles.titleBold}>Keluhan</Text>
      </Text>
      <Text style={styles.label}>Nama</Text>
      <TextInput
        style={styles.input}
        value={fullName}
        onChangeText={setFullName}
        placeholder="Masukkan nama lengkap"
      />
      <Text style={styles.label}>Alamat</Text>
      <TextInput
        style={styles.input}
        value={address}
        onChangeText={setAddress}
        placeholder="Masukkan alamat"
      />
      <View style={styles.row}>
        <TextInput
          style={[styles.input, styles.halfInput]}
          keyboardType="numeric"
          value={age}
          onChangeText={setAge}
          placeholder="Umur"
          placeholderTextColor="grey"
        />
        <TextInput
          style={[styles.input, styles.halfInput]}
          value={gender}
          onChangeText={setGender}
          placeholder="Gender"
          placeholderTextColor="grey"
        />
      </View>
      <Text style={styles.label}>Deskripsikan sakit atau keluhan anda</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        multiline
        value={description}
        onChangeText={handleDescriptionChange}
        placeholder="Deskripsi keluhan"
      />
      <Text style={styles.charCount}>{charCount}</Text>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.submitButton} onPress={onSubmit}>
          <Text style={styles.submitText}>Ajukan keluhan</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.cancelButton}>
          <Text style={styles.cancelText}>Batal</Text>
        </TouchableOpacity>
      </View>

      {/* Flash Message Component */}
      <FlashMessage position="top" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#F7F8FA',
  },
  backButton: {
    marginBottom: 20,
  },
  backText: {
    fontSize: 16,
    color: 'black',
  },
  title: {
    fontSize: 24,
    color: 'black',
    marginBottom: 20,
    marginLeft: 93,
    marginTop: 20,
  },
  titleBold: {
    fontWeight: 'bold',
  },
  label: {
    fontFamily: 'Poppins-Regular',
    flexDirection: 'row',
    color: 'black',
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 15,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    width: '48%',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  charCount: {
    alignSelf: 'flex-end',
    color: '#999',
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  submitButton: {
    backgroundColor: '#4C8BF5',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  submitText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#FF5A5F',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  cancelText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Keluhan;
