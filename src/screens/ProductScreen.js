import React from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import { Colors, Spacing, Typography } from '../theme';
import { useCartDispatch } from '../context/CartContext';
import Header from '../components/Header';

export default function ProductScreen({ route, navigation }) {
  const { product } = route.params || { product: { name: 'Item', price: '$0.00', image: '' } };

  const dispatch = useCartDispatch();

  const addToCart = () => {
    dispatch({ type: 'ADD', item: { id: product.id, name: product.name, price: product.price } });
    alert('Added to cart');
  };

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      {product.image ? <Image source={{ uri: product.image }} style={styles.image} /> : null}
      <Text style={[styles.name, Typography.h1]}>{product.name}</Text>
      <Text style={[styles.price, Typography.h2]}>{product.price}</Text>
      <View style={{ marginTop: Spacing.m }}>
        <Button title="Add to Cart" onPress={addToCart} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: Spacing.m, backgroundColor: Colors.background },
  image: { width: '100%', height: 220, borderRadius: 12, marginBottom: Spacing.m },
  name: { color: Colors.text },
  price: { color: Colors.muted }
});
