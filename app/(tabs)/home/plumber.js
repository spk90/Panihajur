// PlumberList.js

import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase'; // Import your Firestore instance

const PlumberList = () => {
  const [loading, setLoading] = useState(true);
  const [plumbers, setPlumbers] = useState([]);

  useEffect(() => {
    const fetchPlumbers = async () => {
      try {
        const colRef = collection(db, 'plumber');
        const querySnapshot = await getDocs(colRef);

        const plumberNames = [];
        querySnapshot.forEach((doc) => {
          plumberNames.push(doc.data().name); // Assuming 'name' is the field in your Firestore document
        });

        setPlumbers(plumberNames);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching plumbers:', error);
        setLoading(false);
      }
    };

    fetchPlumbers();
  }, []);

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Plumber List</Text>
      <FlatList
        data={plumbers}
        renderItem={({ item }) => <Text style={styles.item}>{item}</Text>}
        keyExtractor={(item) => item}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  item: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default PlumberList;
