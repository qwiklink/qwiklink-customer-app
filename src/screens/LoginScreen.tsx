// src/screens/LoginScreen.tsx

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { API_BASE_URL } from '../config';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/auth/login`,
        { email, password }
      );

      const token = response.data.token;

      await AsyncStorage.setItem('token', token);

      Alert.alert('Login Success', 'You have successfully logged in!');
      navigation.navigate('Home' as never); // make sure "Home" exists in your stack
    } catch (error: any) {
      console.error('Login error:', error);
      Alert.alert(
        'Login Failed',
        error.response?.data?.message || `Request failed with status code ${error.response?.status || 'Unknown'}`
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Qwiklink Customer Login</Text>

      <TextInput
        placeholder="Email"
        style={styles.input}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        placeholder="Password"
        style={styles.input}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Button title="Log In" onPress={handleLogin} />

      <TouchableOpacity onPress={() => navigation.navigate('Signup' as never)}>
        <Text style={styles.link}>Don’t have an account? Sign up</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword' as never)}>
        <Text style={styles.link}>Forgot password?</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#0A0A0A',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  link: {
    marginTop: 15,
    textAlign: 'center',
    color: '#0066cc',
  },
});

