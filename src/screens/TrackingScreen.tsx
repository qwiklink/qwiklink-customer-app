// src/screens/TrackingScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';

const TrackingScreen = () => {
  const [deliveries, setDeliveries] = useState<any[]>([]);

  useEffect(() => {
    const fetchDeliveries = async () => {
      try {
        const res = await axios.get('https://2460d40f-4864-42e2-b705-6acbe2cd510e-00-39rf5ppou79oz.picard.replit.dev/api/delivery/my-deliveries', {
          headers: {
            Authorization: `Bearer YOUR_TOKEN_HERE`, // replace with stored token
          },
        });
        setDeliveries(res.data);
      } catch (err) {
        console.error('Fetch error:', err);
      }
    };

    fetchDeliveries();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Delivery Tracking</Text>
      <FlatList
        data={deliveries}
        keyExtractor={(item) => item._id}
        renderItem={({ item }: { item: any }) => (
          <View style={styles.item}>
            <Text>To: {item.dropoffAddress}</Text>
            <Text>Status: {item.status}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  item: { padding: 10, backgroundColor: '#eee', marginBottom: 10, borderRadius: 8 },
});

export default TrackingScreen;
