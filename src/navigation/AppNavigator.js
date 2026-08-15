import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import ProductScreen from '../screens/ProductScreen';
import CartScreen from '../screens/CartScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CheckoutSuccessScreen from '../screens/CheckoutSuccessScreen';
import { CartProvider } from '../context/CartContext';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <CartProvider>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Product" component={ProductScreen} />
        <Stack.Screen name="Cart" component={CartScreen} />
        <Stack.Screen name="CheckoutSuccess" component={CheckoutSuccessScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </CartProvider>
  );
}
