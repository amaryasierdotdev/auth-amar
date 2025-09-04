import React from 'react';
import { Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Text } from '@tamagui/core';
import { YStack, XStack } from '@tamagui/stacks';
import { Card } from '@tamagui/card';
import { useAuth } from '../context';
import { PrimaryButton, LoadingSpinner, ThemeToggle } from '../components/ui';

export const HomeScreen: React.FC = () => {
  const { user, logout, isLoading } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await logout();
          },
        },
      ],
    );
  };

  if (isLoading) {
    return <LoadingSpinner text="Logging out..." />;
  }

  if (!user) {
    return (
      <YStack flex={1} justifyContent="center" alignItems="center" backgroundColor="$background">
        <StatusBar style="dark" />
        <Text fontSize={16} color="$error" fontFamily="Nunito_400Regular">
          No user data available
        </Text>
      </YStack>
    );
  }

  return (
    <YStack flex={1} backgroundColor="$background">
      <StatusBar style="dark" />
      <YStack flex={1} paddingHorizontal={32} paddingTop={48}>
        {/* Header */}
        <YStack alignItems="center" marginBottom={64}>
          <Text 
            fontSize={32}
            fontWeight="700" // Bold
            color="$color"
            textAlign="center"
            marginBottom={8}
            fontFamily="Nunito_700Bold"
          >
            Welcome!
          </Text>
          <Text 
            fontSize={16}
            color="$colorTertiary"
            textAlign="center"
            fontFamily="Nunito_400Regular"
          >
            You're successfully logged in
          </Text>
        </YStack>

        {/* User Info Container */}
        <YStack flex={1} space={32}>
          <Text 
            fontSize={24}
            fontWeight="600" // SemiBold
            color="$color"
            fontFamily="Nunito_600SemiBold"
          >
            Your Account Information
          </Text>
          
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
              <XStack justifyContent="space-between" alignItems="center" paddingVertical={16}>
                <Text 
                  fontSize={16}
                  fontWeight="500" // Medium
                  color="$color"
                  fontFamily="Nunito_500Medium"
                  flex={1}
                >
                  Name:
                </Text>
                <Text 
                  fontSize={16}
                  color="$colorSecondary"
                  fontFamily="Nunito_400Regular"
                  flex={2}
                  textAlign="right"
                >
                  {user.name}
                </Text>
              </XStack>

              <XStack justifyContent="space-between" alignItems="center" paddingVertical={16}>
                <Text 
                  fontSize={16}
                  fontWeight="500" // Medium
                  color="$color"
                  fontFamily="Nunito_500Medium"
                  flex={1}
                >
                  Email:
                </Text>
                <Text 
                  fontSize={16}
                  color="$colorSecondary"
                  fontFamily="Nunito_400Regular"
                  flex={2}
                  textAlign="right"
                >
                  {user.email}
                </Text>
              </XStack>

              <XStack justifyContent="space-between" alignItems="center" paddingVertical={16}>
                <Text 
                  fontSize={16}
                  fontWeight="500" // Medium
                  color="$color"
                  fontFamily="Nunito_500Medium"
                  flex={1}
                >
                  User ID:
                </Text>
                <Text 
                  fontSize={16}
                  color="$colorSecondary"
                  fontFamily="Nunito_400Regular"
                  flex={2}
                  textAlign="right"
                >
                  {user.id}
                </Text>
              </XStack>
            </YStack>
          </Card>
        </YStack>

        {/* Actions */}
        <YStack paddingBottom={48} marginTop={48} space={24}>
          <ThemeToggle />
          <PrimaryButton
            title="Logout"
            onPress={handleLogout}
            disabled={isLoading}
          />
        </YStack>
      </YStack>
    </YStack>
  );
};