// src/utils/authHeader.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

const authHeader = async () => {
  const token = await AsyncStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export default authHeader;
