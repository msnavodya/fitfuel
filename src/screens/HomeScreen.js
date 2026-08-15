import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Colors, Spacing, Typography } from '../theme';
import Header from '../components/Header';

const SAMPLE_PRODUCTS = [
  { id: '1', name: 'Protein Bowl', price: '$9.99', image: 'https://images.unsplash.com/photo-1604908812557-9b5a7f3a8f0a' },
  { id: '2', name: 'Green Smoothie', price: '$6.49', image: 'https://images.unsplash.com/photo-1543353071-087092ec393f' },
  { id: '3', name: 'Fruit Salad', price: '$5.99', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd' }
];

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <Text style={[styles.title, Typography.h1]}>Discover</Text>
      <FlatList
        data={SAMPLE_PRODUCTS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 24 }}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Product', { product: item })}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.info}>
              <Text style={[styles.name, Typography.h2]}>{item.name}</Text>
              <Text style={styles.price}>{item.price}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: Spacing.m, backgroundColor: Colors.background },
  title: { marginBottom: Spacing.m, color: Colors.text },
  card: { flexDirection: 'row', padding: Spacing.m, borderRadius: 12, backgroundColor: Colors.surface, marginBottom: Spacing.s, alignItems: 'center' },
  image: { width: 72, height: 72, borderRadius: 12, marginRight: Spacing.m, backgroundColor: '#eaeaea' },
  info: { flex: 1 },
  name: { color: Colors.text },
  price: { color: Colors.muted, marginTop: 6 }
});
