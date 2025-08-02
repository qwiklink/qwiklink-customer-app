import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { API_BASE_URL } from '../config';

const DeliveryRequestScreen = () => {
  const navigation = useNavigation();
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');
  const [packageDetails, setPackageDetails] = useState('');

  const handleSubmit = async () => {
    if (!pickupLocation || !dropoffLocation || !packageDetails) {
      Alert.alert('Missing Information', 'Please fill in all fields.');
      return;
    }

    try {
      const token = await AsyncStorage.getItem('token');

      const response = await axios.post(
        `${API_BASE_URL}/api/delivery/create`,
        {
          pickupLocation,
          dropoffLocation,
          packageDetails,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Alert.alert('Success', 'Delivery request submitted!');
      navigation.navigate('Home' as never);
    } catch (error: any) {
      console.error(error);
      Alert.alert(
        'Error',
        error.response?.data?.message || 'Failed to submit delivery request.'
      );
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Request a Delivery</Text>

      <TextInput
        style={styles.input}
        placeholder="Pickup Location"
        value={pickupLocation}
        onChangeText={setPickupLocation}
      />

      <TextInput
        style={styles.input}
        placeholder="Dropoff Location"
        value={dropoffLocation}
        onChangeText={setDropoffLocation}
      />

      <TextInput
        style={styles.input}
        placeholder="Package Details"
        value={packageDetails}
        onChangeText={setPackageDetails}
        multiline
        numberOfLines={4}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit Request</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default DeliveryRequestScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#ffffff',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 30,
    textAlign: 'center',
    color: '#222222',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  button: {
    backgroundColor: '#0066cc',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
