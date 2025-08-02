import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/splash-icon.png')} // Replace with actual Qwiklink logo if different
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>Welcome to Qwiklink, Customer!</Text>
      <Text style={styles.subtitle}>How can we help you today?</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('DeliveryRequest' as never)}
      >
        <Text style={styles.buttonText}>Request a Delivery</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.secondaryButton]}
        onPress={() => navigation.navigate('Tracking' as never)}
      >
        <Text style={styles.buttonText}>Track My Delivery</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 160,
    height: 160,
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#222222',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 30,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#0066cc',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginVertical: 10,
    width: '100%',
  },
  secondaryButton: {
    backgroundColor: '#00b894',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center',
  },
});
