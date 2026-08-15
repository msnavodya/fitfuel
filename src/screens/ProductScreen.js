import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function ProductScreen({ route, navigation }) {
  const { product } = route.params || { product: { name: 'Item', price: '$0.00' } };

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.price}>{product.price}</Text>
      <Button title="Add to Cart" onPress={() => alert('Add to cart (not implemented)')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  name: { fontSize: 24, fontWeight: '700', marginBottom: 12 },
  price: { fontSize: 18, color: '#333', marginBottom: 24 }
});
