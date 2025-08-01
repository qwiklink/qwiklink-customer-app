// src/screens/SplashScreen.tsx
import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';

type Props = StackScreenProps<RootStackParamList, 'Splash'>;

const SplashScreen = ({ navigation }: Props) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.replace('Login');
    }, 2000);
    return () => clearTimeout(timeout);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/qwiklink-logo.png')} style={styles.logo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#004aad',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 180,
    height: 180,
    resizeMode: 'contain',
  },
});

export default SplashScreen;
