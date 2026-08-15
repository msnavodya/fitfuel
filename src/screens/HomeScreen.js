import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';

const SAMPLE_PRODUCTS = [
  { id: '1', name: 'Protein Bowl', price: '$9.99', image: '' },
  { id: '2', name: 'Green Smoothie', price: '$6.49', image: '' },
  { id: '3', name: 'Fruit Salad', price: '$5.99', image: '' }
];

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>FitFuel</Text>
      <FlatList
        data={SAMPLE_PRODUCTS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Product', { product: item })}>
            <View style={styles.imagePlaceholder} />
            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.price}>{item.price}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 28, fontWeight: '700', marginBottom: 16 },
  card: { flexDirection: 'row', padding: 12, borderRadius: 8, backgroundColor: '#f7f7f7', marginBottom: 12, alignItems: 'center' },
  imagePlaceholder: { width: 64, height: 64, borderRadius: 8, backgroundColor: '#e0e0e0', marginRight: 12 },
  info: { flex: 1 },
  name: { fontSize: 16, fontWeight: '600' },
  price: { fontSize: 14, color: '#666', marginTop: 4 }
});
