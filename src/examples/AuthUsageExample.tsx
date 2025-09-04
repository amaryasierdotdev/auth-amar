import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import { useAuth } from '../context';
import { LoginCredentials, SignupCredentials } from '../types/auth.types';

/**
 * Example component showing how to use the Auth Context
 * This demonstrates login, signup, and logout functionality
 * 
 * Usage: Import and use this component in any screen that needs authentication
 */
export const AuthUsageExample: React.FC = () => {
  const { login, signup, logout, user, isLoading, isAuthenticated } = useAuth();
  
  // Form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isSignupMode, setIsSignupMode] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const credentials: LoginCredentials = { email: email.trim(), password };
    const result = await login(credentials);
    
    if (result.success) {
      console.log('Login successful!', result.user);
      clearForm();
    }
  };

  const handleSignup = async () => {
    if (!email.trim() || !password.trim() || !name.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const credentials: SignupCredentials = { 
      email: email.trim(), 
      password, 
      name: name.trim() 
    };
    const result = await signup(credentials);
    
    if (result.success) {
      console.log('Signup successful!', result.user);
      clearForm();
    }
  };

  const handleLogout = () => {
    logout();
    clearForm();
    console.log('User logged out');
  };

  const clearForm = () => {
    setEmail('');
    setPassword('');
    setName('');
  };

  const toggleMode = () => {
    setIsSignupMode(!isSignupMode);
    clearForm();
  };

  if (isAuthenticated && user) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Welcome back!</Text>
        <Text style={styles.userInfo}>Email: {user.email}</Text>
        <Text style={styles.userInfo}>Name: {user.name}</Text>
        <View style={styles.buttonContainer}>
          <Button title="Logout" onPress={handleLogout} color="#FF6B6B" />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isSignupMode ? 'Sign Up' : 'Login'}</Text>
      
      {isSignupMode && (
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
        />
      )}
      
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Password (min 6 characters)"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
      />
      
      <View style={styles.buttonContainer}>
        <Button
          title={isLoading ? 'Loading...' : (isSignupMode ? 'Sign Up' : 'Login')}
          onPress={isSignupMode ? handleSignup : handleLogin}
          disabled={isLoading}
        />
      </View>
      
      <View style={styles.buttonContainer}>
        <Button
          title={isSignupMode ? 'Already have an account? Login' : 'Need an account? Sign Up'}
          onPress={toggleMode}
          color="#888"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    fontSize: 16,
  },
  buttonContainer: {
    marginVertical: 5,
  },
  userInfo: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
    color: '#666',
  },
});