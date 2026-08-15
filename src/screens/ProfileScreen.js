import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';

export default function ProfileScreen({ navigation }) {
  const { user, logout } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function loadOrders() {
      if (!user) return;
      const q = query(collection(db, 'orders'), where('userId', '==', user.uid), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      const docs = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      setOrders(docs);
    }
    loadOrders();
  }, [user]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Text style={styles.info}>Signed in: {user?.email}</Text>
      <Button title="Sign out" onPress={() => logout()} />

      <Text style={[styles.title, { marginTop: 20 }]}>Order History</Text>
      <FlatList
        data={orders}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <View style={styles.order}>
            <Text style={styles.orderId}>Order: {item.id}</Text>
            <Text>Status: {item.status}</Text>
            <Text>Total: {item.total}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={{ color: '#666' }}>No orders yet</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 12 },
  info: { color: '#666', marginBottom: 12 },
  order: { padding: 12, borderBottomWidth: 1, borderBottomColor: '#eee' },
  orderId: { fontWeight: '600' }
});
