import React from 'react';
import { Pressable } from 'react-native';
import { Text } from '@tamagui/core';
import { XStack } from '@tamagui/stacks';
import { Sun, Moon } from '@tamagui/lucide-icons';
import { useTheme } from '../../context/ThemeContext';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Pressable
      onPress={toggleTheme}
      style={({ pressed }) => ({
        backgroundColor: theme === 'light' ? '#f8f9fa' : '#2c2c2e',
        borderColor: theme === 'light' ? '#e1e5e9' : '#38383a',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 12,
        alignItems: 'center',
        justifyContent: 'center',
        opacity: pressed ? 0.8 : 1,
        transform: [{ scale: pressed ? 0.98 : 1 }],
      })}
    >
      <XStack alignItems="center" space={8}>
        {theme === 'light' ? (
          <Moon 
            size={16}
            color={'#1a1a1a'}
          />
        ) : (
          <Sun 
            size={16}
            color={'#ffffff'}
          />
        )}
        <Text
          fontSize={16}
          fontWeight="500"
          color={theme === 'light' ? '#1a1a1a' : '#ffffff'}
          fontFamily="Nunito_500Medium"
        >
          {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
        </Text>
      </XStack>
    </Pressable>
  );
};