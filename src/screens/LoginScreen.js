import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useAuth } from '../context/AuthContext';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  // Google auth request (replace client IDs with your own)
  const [request, response, promptAsync] = Google.useAuthRequest({
    // values are generated from .env to src/config/env.js by running `node scripts/load-env.js`
    expoClientId: require('../config/env').EXPO_CLIENT_ID || '',
    iosClientId: require('../config/env').IOS_CLIENT_ID || '',
    androidClientId: require('../config/env').ANDROID_CLIENT_ID || '',
    webClientId: require('../config/env').WEB_CLIENT_ID || ''
  });

  useEffect(() => {
    async function handleResponse() {
      if (response?.type === 'success') {
        const { authentication } = response;
        try {
          const credential = GoogleAuthProvider.credential(authentication.idToken, authentication.accessToken);
          await signInWithCredential(auth, credential);
        } catch (err) {
          Alert.alert('Google sign-in failed', err.message || 'Unable to sign in with Google');
        }
      }
    }
    handleResponse();
  }, [response]);

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
      <View style={{ marginTop: 12 }}>
        <Button disabled={!request} title="Continue with Google" onPress={() => promptAsync()} />
      </View>
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
