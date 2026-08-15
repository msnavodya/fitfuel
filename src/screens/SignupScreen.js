import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useAuth } from '../context/AuthContext';

export default function SignupScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signup } = useAuth();

  const onSignup = async () => {
    try {
      await signup(email.trim(), password);
    } catch (err) {
      Alert.alert('Signup failed', err.message || 'Unable to create account');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create an account</Text>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} keyboardType="email-address" autoCapitalize="none" />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} style={styles.input} secureTextEntry />
      <Button title="Sign up" onPress={onSignup} />
      <View style={styles.row}>
        <Text>Already have an account?</Text>
        <Button title="Login" onPress={() => navigation.navigate('Login')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: 'center', backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 18, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 12, borderRadius: 8, marginBottom: 12 },
  row: { marginTop: 12, alignItems: 'center' }
});
