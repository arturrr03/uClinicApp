import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { getDatabase, ref, set, push, onValue, serverTimestamp } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import FlashMessage, { showMessage } from 'react-native-flash-message';

const Keluhan = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('');
  const [date, setDate] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [gender, setGender] = useState('');
  const [description, setDescription] = useState('');
  const [charCount, setCharCount] = useState(200);
  const [status, setStatus] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const db = getDatabase();
      const recordRef = ref(db, `users/mahasiswa/${user.uid}/record`);
      onValue(recordRef, (snapshot) => {
        const records = snapshot.val();
        if (records) {
          const latestRecord = Object.values(records).pop();
          setStatus(latestRecord.status);
        }
      });
    }
  }, []);

  const handleDescriptionChange = (text) => {
    setDescription(text);
    setCharCount(200 - text.length);
  };

  const handleDateChange = (event, selected) => {
    setShowDatePicker(false);
    if (selected) {
      const formatted = selected.toISOString().split('T')[0];
      setSelectedDate(selected);
      setDate(formatted);
    }
  };

  const onSubmit = () => {
    if (!fullName || !age || !date || !gender || !description) {
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
      const recordRef = ref(db, `users/mahasiswa/${user.uid}/record`);
      const recordData = {
        fullName,
        age,
        date,
        gender,
        description,
        status: 'pending',
        createdAt: serverTimestamp(),
      };

      const newRecordRef = push(recordRef);
      set(newRecordRef, recordData)
        .then(() => {
          showMessage({
            message: 'Success',
            description: 'Keluhan berhasil dikirim. Menunggu respon...',
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
    }
  };

  useEffect(() => {
    if (status === 'berhasil') {
      showMessage({
        message: 'Keluhan Anda telah diterima!',
        type: 'success',
      });
    }
  }, [status]);

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
      <Text style={styles.label}>Tanggal</Text>
      <TouchableOpacity onPress={() => setShowDatePicker(true)}>
        <View pointerEvents="none">
          <TextInput
            style={styles.input}
            value={date}
            placeholder="Pilih tanggal"
            editable={false}
          />
        </View>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={selectedDate || new Date()}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleDateChange}
          maximumDate={new Date()}
        />
      )}
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

      {status && (
        <View style={styles.statusContainer}>
          <Text style={[styles.statusText, { color: status === 'pending' ? 'orange' : 'green' }]}>
            Status Keluhan: {status === 'pending' ? 'Menunggu' : 'Berhasil'}
          </Text>
        </View>
      )}

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
    color: 'black',
    marginBottom: 5,
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
  statusContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  statusText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Keluhan;
