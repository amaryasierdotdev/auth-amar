import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Text } from '@tamagui/core';
import { YStack, XStack } from '@tamagui/stacks';
import { Card } from '@tamagui/card';
import { useAuth } from '../context';
import { AuthStackParamList } from '../types/navigation.types';
import { FormInput, PrimaryButton, SecondaryButton, LoadingSpinner } from '../components/ui';

type SignupScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Signup'>;

interface Props {
  navigation: SignupScreenNavigationProp;
}

export const SignupScreen: React.FC<Props> = ({ navigation }) => {
  const { signup, isLoading } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string }>({});

  const validateForm = (): boolean => {
    const newErrors: { name?: string; email?: string; password?: string } = {};

    // Name validation
    if (!name.trim()) {
      newErrors.name = 'Name is required';
    } else if (name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Email validation
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!email.includes('@') || !email.includes('.')) {
      newErrors.email = 'Please enter a valid email address';
    } else if (email.trim().length < 5) {
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

  const handleSignup = async () => {
    if (!validateForm()) {
      return;
    }

    const result = await signup({ 
      name: name.trim(), 
      email: email.trim(), 
      password 
    });
    
    if (!result.success) {
      // Error is already handled by AuthContext with Alert
      console.log('Signup failed:', result.error);
    }
  };

  const clearError = (field: 'name' | 'email' | 'password') => {
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  if (isLoading) {
    return <LoadingSpinner text="Creating Account..." />;
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
              Create Account
            </Text>
            <Text 
              fontSize={16}
              color="$colorTertiary"
              textAlign="center"
              fontFamily="Nunito_400Regular"
            >
              Sign up to get started
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
                label="Full Name"
                placeholder="Enter your full name"
                value={name}
                onChangeText={(text) => {
                  setName(text);
                  clearError('name');
                }}
                error={errors.name}
                autoCapitalize="words"
                autoCorrect={false}
                disabled={isLoading}
              />

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
                placeholder="Create a password (min 6 characters)"
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
                  title="Create Account"
                  onPress={handleSignup}
                  disabled={isLoading}
                  loading={isLoading}
                />

                <SecondaryButton
                  title="Already have an account? Sign In"
                  onPress={() => navigation.navigate('Login')}
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