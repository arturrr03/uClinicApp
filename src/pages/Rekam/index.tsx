import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { getDatabase, ref, onValue } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { Gap } from '../../components';

const Rekam = ({ navigation }) => {
  const [records, setRecords] = useState([]);
  const [nama, setNama] = useState('');
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      const db = getDatabase();
      const userRef = ref(db, `users/mahasiswa/${user.uid}`);

      onValue(userRef, (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();

          // Ambil nama mahasiswa
          setNama(data.nama || 'Description Rekam Medis');

          // Ambil data record jika ada
          if (data.record) {
            const recordArray = Object.keys(data.record).map((key) => ({
              id: key,
              ...data.record[key],
            }));
            setRecords(recordArray);
          } else {
            setRecords([]);
          }
        }
      });
    }
  }, [user]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header} />
      <Gap height={62} />
      <View style={styles.contentWrapper}>
        <Text style={styles.rm}>Rekam Medis</Text>
        <Gap height={33} />

        {records.map((record) => (
          <TouchableOpacity
            key={record.id}
            style={styles.rm3}
            onPress={() => navigation.navigate('DescRm', { recordId: record.id })}
          >
            <Gap height={10} />
            <Text style={styles.nama}>{nama}</Text>
            <Gap height={5} />
            <Text style={styles.tgl}>{new Date(record.createdAt).toLocaleDateString()}</Text>
            <Gap height={7} />
            <Text style={styles.Ks}>{record.description}</Text>
            <Gap height={45} />
            <Text style={styles.Jam}>{new Date(record.createdAt).toLocaleTimeString()}</Text>
          </TouchableOpacity>
        ))}

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

export default Rekam;

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
  contentWrapper: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  rm: {
    fontSize: 32,
    fontFamily: 'Poppins-Bold',
  },
  rm3: {
    width: '100%',
    height: 160,
    backgroundColor: '#6DFF59',
    borderRadius: 8,
    padding: 20,
    marginBottom: 15,
  },
  nama: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: '#000',
  },
  tgl: {
    fontFamily: 'Poppins-Regular',
    fontSize: 18,
  },
  Ks: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
  },
  Jam: {
    fontFamily: 'Poppins-Bold',
    fontSize: 14,
    position: 'absolute',
    right: 20,
    bottom: 20,
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
