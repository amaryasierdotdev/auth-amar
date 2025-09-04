import React from 'react';
import { ActivityIndicator } from 'react-native';
import { Text } from '@tamagui/core';
import { YStack } from '@tamagui/stacks';

interface LoadingSpinnerProps {
  size?: 'small' | 'large';
  text?: string;
  color?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'large',
  text = 'Loading...',
  color = '#007AFF',
}) => {
  return (
    <YStack flex={1} justifyContent="center" alignItems="center" backgroundColor="$background">
      <ActivityIndicator size={size} color={color} />
      {text && (
        <Text
          marginTop={24}
          fontSize={16}
          color="$colorTertiary"
          fontWeight="500"
          fontFamily="Nunito_500Medium"
        >
          {text}
        </Text>
      )}
    </YStack>
  );
};