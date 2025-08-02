import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import axios from 'axios';
import { API_BASE_URL } from '../config';

const TrackingScreen = () => {
  const [deliveryId, setDeliveryId] = useState('');
  const [status, setStatus] = useState('');

  const handleTrack = async () => {
    if (!deliveryId) {
      Alert.alert('Missing Field', 'Please enter a Delivery ID.');
      return;
    }

    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/delivery/track/${deliveryId}`
      );

      setStatus(response.data.status || 'Unknown');
    } catch (error: any) {
      console.error(error);
      Alert.alert(
        'Tracking Failed',
        error.response?.data?.message || 'Could not fetch delivery status.'
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Track Your Delivery</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Delivery ID"
        value={deliveryId}
        onChangeText={setDeliveryId}
      />

      <TouchableOpacity style={styles.button} onPress={handleTrack}>
        <Text style={styles.buttonText}>Track</Text>
      </TouchableOpacity>

      {status ? (
        <View style={styles.statusBox}>
          <Text style={styles.statusLabel}>Current Status:</Text>
          <Text style={styles.statusText}>{status.toUpperCase()}</Text>
        </View>
      ) : null}
    </View>
  );
};

export default TrackingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#0066cc',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  statusBox: {
    marginTop: 30,
    padding: 20,
    borderColor: '#0066cc',
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: '#f0f8ff',
    alignItems: 'center',
  },
  statusLabel: {
    fontSize: 16,
    color: '#444',
    marginBottom: 8,
  },
  statusText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0066cc',
  },
});
