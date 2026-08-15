import React, { useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useCartDispatch } from '../context/CartContext';

export default function CheckoutSuccessScreen({ route, navigation }) {
  const dispatch = useCartDispatch();
  const { orderId } = route.params || {};

  useEffect(() => {
    // clear cart when arriving at success screen
    dispatch({ type: 'CLEAR' });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thank you for your order!</Text>
      {orderId ? <Text style={styles.info}>Order ID: {orderId}</Text> : null}
      <Button title="Back to Home" onPress={() => navigation.navigate('Home')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: 'center', backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 12, textAlign: 'center' },
  info: { color: '#666', marginBottom: 12, textAlign: 'center' }
});
