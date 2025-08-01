import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function PhoneNumberScreen() {
  const [phone, setPhone] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter your number</Text>

      <View style={styles.inputRow}>
        <Image
          source={require('../../assets/flags/sa.png')} // Add a South African flag icon here
          style={styles.flag}
        />
        <Text style={styles.prefix}>+27</Text>
        <TextInput
          style={styles.input}
          placeholder="Phone number"
          keyboardType="phone-pad"
          placeholderTextColor="#aaa"
          value={phone}
          onChangeText={setPhone}
        />
      </View>

      <Text style={styles.or}>Or</Text>

      <TouchableOpacity style={styles.socialButton}>
        <Ionicons name="logo-google" size={20} color="#444" />
        <Text style={styles.socialText}>Sign in with Google</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.socialButton}>
        <Ionicons name="logo-facebook" size={20} color="#444" />
        <Text style={styles.socialText}>Sign in with Facebook</Text>
      </TouchableOpacity>

      <Text style={styles.footerText}>
        By signing up, you agree to our{' '}
        <Text style={styles.link}>Terms & Conditions</Text>, acknowledge our{' '}
        <Text style={styles.link}>Privacy Policy</Text>, and confirm that you're over 18. We may
        send promotions related to our services – you can unsubscribe anytime in Communication
        Settings under your profile.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
    justifyContent: 'center'
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 32,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#fff'
  },
  flag: {
    width: 24,
    height: 16,
    marginRight: 8,
    resizeMode: 'contain'
  },
  prefix: {
    fontSize: 16,
    marginRight: 8
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000'
  },
  or: {
    textAlign: 'center',
    marginVertical: 24,
    fontSize: 16,
    color: '#888'
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 14,
    borderRadius: 8,
    marginBottom: 16
  },
  socialText: {
    marginLeft: 10,
    fontSize: 16
  },
  footerText: {
    fontSize: 12,
    textAlign: 'center',
    color: '#888',
    marginTop: 32
  },
  link: {
    color: '#007bff',
    textDecorationLine: 'underline'
  }
});
