// src/screens/DeliveryRequestScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView } from 'react-native';
import axios from 'axios';
import authHeader from '../utils/authHeader';

const DeliveryRequestScreen = () => {
  const [pickupAddress, setPickupAddress] = useState('');
  const [dropoffAddress, setDropoffAddress] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [recipientPhone, setRecipientPhone] = useState('');
  const [parcelSize, setParcelSize] = useState('');

  const handleSubmit = async () => {
    if (!pickupAddress || !dropoffAddress || !recipientName || !recipientPhone || !parcelSize) {
      Alert.alert('Please fill in all fields');
      return;
    }

    try {
      const res = await axios.post(
        'https://qwiklink-backend.replit.app/api/delivery',
        {
          pickupAddress,
          dropoffAddress,
          recipientName,
          recipientPhone,
          parcelSize,
        },
        await authHeader() // ✅ include token
      );

      console.log('✅ Delivery created:', res.data);
      Alert.alert('Success', 'Your delivery has been requested.');
      setPickupAddress('');
      setDropoffAddress('');
      setRecipientName('');
      setRecipientPhone('');
      setParcelSize('');
    } catch (err: unknown) {
      const error = err as Error;
      console.error('❌ Delivery error:', error.message);
      Alert.alert('Error', 'Failed to request delivery');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Request a Delivery</Text>

      <TextInput
        style={styles.input}
        placeholder="Pickup Address"
        value={pickupAddress}
        onChangeText={setPickupAddress}
      />
      <TextInput
        style={styles.input}
        placeholder="Dropoff Address"
        value={dropoffAddress}
        onChangeText={setDropoffAddress}
      />
      <TextInput
        style={styles.input}
        placeholder="Recipient Name"
        value={recipientName}
        onChangeText={setRecipientName}
      />
      <TextInput
        style={styles.input}
        placeholder="Recipient Phone"
        value={recipientPhone}
        onChangeText={setRecipientPhone}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Parcel Size (e.g. Small, Medium, Large)"
        value={parcelSize}
        onChangeText={setParcelSize}
      />

      <Button title="Submit Delivery" onPress={handleSubmit} color="#004aad" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#004aad',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
});

export default DeliveryRequestScreen;
