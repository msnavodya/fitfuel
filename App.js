import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import AuthNavigator from './src/navigation/AuthNavigator';
import { AuthProvider, useAuth } from './src/context/AuthContext';

function RootNavigation() {
  const { user, initializing } = useAuth();
  if (initializing) return null;
  return user ? <AppNavigator /> : <AuthNavigator />;
}

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <RootNavigation />
      </NavigationContainer>
    </AuthProvider>
  );
}
