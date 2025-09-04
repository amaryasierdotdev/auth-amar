import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Text } from '@tamagui/core';
import { YStack, XStack } from '@tamagui/stacks';
import { Card } from '@tamagui/card';
import { useAuth } from '../context';
import { AuthStackParamList } from '../types/navigation.types';
import { FormInput, PrimaryButton, SecondaryButton, LoadingSpinner } from '../components/ui';

type LoginScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Login'>;

interface Props {
  navigation: LoginScreenNavigationProp;
}

export const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validateForm = (): boolean => {
    const newErrors: { email?: string; password?: string } = {};

    // Email validation
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!email.includes('@') || !email.includes('.')) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!password.trim()) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) {
      return;
    }

    const result = await login({ email: email.trim(), password });
    
    if (!result.success) {
      // Error is already handled by AuthContext with Alert
      console.log('Login failed:', result.error);
    }
  };

  const clearError = (field: 'email' | 'password') => {
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  if (isLoading) {
    return <LoadingSpinner text="Signing In..." />;
  }

  return (
    <KeyboardAvoidingView 
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <YStack 
          flex={1} 
          justifyContent="center" 
          paddingHorizontal={32} 
          backgroundColor="$background"
        >
          {/* Header */}
          <YStack alignItems="center" marginBottom={64}>
            <Text 
              fontSize={32}
              fontWeight="700"
              color="$color"
              textAlign="center"
              marginBottom={8}
              fontFamily="Nunito_700Bold"
            >
              Welcome Back
            </Text>
            <Text 
              fontSize={16}
              color="$colorTertiary"
              textAlign="center"
              fontFamily="Nunito_400Regular"
            >
              Sign in to your account
            </Text>
          </YStack>

          {/* Form Container */}
          <Card 
            backgroundColor="$backgroundSecondary"
            borderRadius={12}
            padding={40}
            borderWidth={1}
            borderColor="$borderColor"
            shadowColor="#000000"
            shadowOffset={{ width: 0, height: 2 }}
            shadowOpacity={0.1}
            shadowRadius={8}
            elevation={4}
          >
            <YStack space={32}>
              <FormInput
                label="Email"
                placeholder="Enter your email"
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  clearError('email');
                }}
                error={errors.email}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                disabled={isLoading}
              />

              <FormInput
                label="Password"
                placeholder="Enter your password"
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  clearError('password');
                }}
                error={errors.password}
                secureTextEntry
                showPasswordToggle={true}
                autoCapitalize="none"
                disabled={isLoading}
              />

              <YStack space={24} marginTop={16}>
                <PrimaryButton
                  title="Sign In"
                  onPress={handleLogin}
                  disabled={isLoading}
                  loading={isLoading}
                />

                <SecondaryButton
                  title="Don't have an account? Sign Up"
                  onPress={() => navigation.navigate('Signup')}
                  disabled={isLoading}
                />
              </YStack>
            </YStack>
          </Card>
        </YStack>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};