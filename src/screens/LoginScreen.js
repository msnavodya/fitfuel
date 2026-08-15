import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useAuth } from '../context/AuthContext';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const onLogin = async () => {
    try {
      await login(email.trim(), password);
    } catch (err) {
      Alert.alert('Login failed', err.message || 'Unable to login');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to FitFuel</Text>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} keyboardType="email-address" autoCapitalize="none" />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} style={styles.input} secureTextEntry />
      <Button title="Login" onPress={onLogin} />
      <View style={styles.row}>
        <Text>Don't have an account?</Text>
        <Button title="Sign up" onPress={() => navigation.navigate('Signup')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: 'center', backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 18, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 12, borderRadius: 8, marginBottom: 12 },
  row: { marginTop: 12, alignItems: 'center' }
});
