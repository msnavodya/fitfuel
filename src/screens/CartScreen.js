import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, Button } from 'react-native';
import { useCart, useCartDispatch, cartTotal } from '../context/CartContext';
import axios from 'axios';
import { Linking, ActivityIndicator } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { createOrder } from '../services/orderService';

export default function CartScreen() {
  const { items } = useCart();
  const dispatch = useCartDispatch();
  const { user } = useAuth();
  const [processing, setProcessing] = React.useState(false);

  const onCheckout = async () => {
    if (!items.length) return;
    setProcessing(true);
    try {
      const total = cartTotal(items);
      const orderId = await createOrder(user?.uid, items, total);
      const resp = await axios.post('http://localhost:4242/create-checkout-session', { items, orderId });
      const { url } = resp.data;
      if (url) Linking.openURL(url);
    } catch (err) {
      Alert.alert('Checkout error', err.message || 'Unable to create checkout session');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Cart</Text>
      <FlatList
        data={items}
        keyExtractor={it => it.id}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.name}>{item.name} x{item.quantity}</Text>
            <Text style={styles.price}>{item.price}</Text>
            <TouchableOpacity onPress={() => dispatch({ type: 'REMOVE', id: item.id })}>
              <Text style={styles.remove}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text style={{ color: '#666' }}>Cart is empty</Text>}
      />
      <View style={styles.footer}>
        <Text style={styles.total}>Total: ${cartTotal(items)}</Text>
        {processing ? (
          <ActivityIndicator />
        ) : (
          <Button title="Checkout" onPress={onCheckout} disabled={!items.length} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 12 },
  row: { paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#eee' },
  name: { fontSize: 16 },
  price: { color: '#333', marginTop: 4 },
  remove: { color: '#d00', marginTop: 6 },
  footer: { paddingVertical: 12, borderTopWidth: 1, borderTopColor: '#eee' },
  total: { fontSize: 18, fontWeight: '700', marginBottom: 8 }
});
