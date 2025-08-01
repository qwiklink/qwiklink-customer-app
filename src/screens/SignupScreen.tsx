import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';

type Props = StackScreenProps<RootStackParamList, 'Signup'>;

const SignupScreen = ({ navigation }: Props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    try {
      const res = await axios.post('https://qwiklink-backend.replit.app/api/auth/register', {
        name,
        email,
        phone,
        password,
        role: 'customer',
      });
      Alert.alert('Account created!', 'You can now log in.');
      navigation.navigate('Login');
    } catch (err: unknown) {
      const error = err as Error;
      Alert.alert('Signup Failed', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Qwiklink Account</Text>
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone"
        value={phone}
        keyboardType="phone-pad"
        onChangeText={setPhone}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Sign Up" onPress={handleSignup} color="#004aad" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 24,
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

export default SignupScreen;
