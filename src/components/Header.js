import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useCart } from '../context/CartContext';

export default function Header({ navigation, title = 'FitFuel' }) {
  const { items } = useCart();
  const count = items.reduce((s, i) => s + (i.quantity || 0), 0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity style={styles.cart} onPress={() => navigation.navigate('Cart')}>
        <Text style={styles.cartText}>Cart</Text>
        {count > 0 ? <View style={styles.badge}><Text style={styles.badgeText}>{count}</Text></View> : null}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { height: 56, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: '700' },
  cart: { position: 'relative', padding: 8 },
  cartText: { fontSize: 16, color: '#222' },
  badge: { position: 'absolute', right: 0, top: -6, backgroundColor: '#e53935', borderRadius: 10, paddingHorizontal: 6, paddingVertical: 2 },
  badgeText: { color: '#fff', fontSize: 12 }
});
