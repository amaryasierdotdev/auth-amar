import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Text } from '@tamagui/core';

/**
 * Props for button components
 * 
 * Shared interface for both PrimaryButton and SecondaryButton variants.
 * Provides consistent API across button types.
 * 
 * @interface ButtonProps
 */
interface ButtonProps {
  /** Button text content */
  title: string;
  /** Callback fired when button is pressed */
  onPress?: () => void;
  /** Whether the button is disabled (non-interactive) */
  disabled?: boolean;
  /** Whether the button is in loading state (shows "Loading...") */
  loading?: boolean;
}

/**
 * Primary Button Component
 * 
 * Main call-to-action button with solid blue background.
 * Used for primary actions like "Sign In", "Save", "Submit".
 * 
 * Features:
 * - Blue background with white text
 * - Loading state with automatic text change
 * - Disabled state with reduced opacity
 * - Press animation with scale and opacity effects
 * - Nunito font family for consistency
 * 
 * @component
 * @param {ButtonProps} props - Button properties
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <PrimaryButton
 *   title="Sign In"
 *   onPress={handleLogin}
 * />
 * 
 * // With loading state
 * <PrimaryButton
 *   title="Creating Account"
 *   loading={isSigningUp}
 *   disabled={isSigningUp}
 * />
 * 
 * // Disabled button
 * <PrimaryButton
 *   title="Save Changes"
 *   disabled={!hasChanges}
 * />
 * ```
 */
export const PrimaryButton: React.FC<ButtonProps> = ({
  title,
  onPress,
  disabled = false,
  loading = false,
}) => {
  const displayTitle = loading ? 'Loading...' : title;
  
  return (
    <Pressable
      style={({ pressed }) => [
        styles.primaryButton,
        disabled && styles.disabled,
        pressed && styles.pressed,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      <Text style={styles.primaryButtonText}>
        {displayTitle}
      </Text>
    </Pressable>
  );
};

/**
 * Secondary Button Component
 * 
 * Secondary action button with transparent background and border.
 * Used for secondary actions like "Cancel", "Skip", navigation.
 * 
 * Features:
 * - Transparent background with colored border
 * - Loading state with automatic text change
 * - Disabled state with reduced opacity
 * - Press animation with scale and opacity effects
 * - Nunito font family for consistency
 * 
 * @component
 * @param {ButtonProps} props - Button properties
 * 
 * @example
 * ```tsx
 * // Navigation button
 * <SecondaryButton
 *   title="Already have an account? Sign In"
 *   onPress={() => navigation.navigate('Login')}
 * />
 * 
 * // Cancel action
 * <SecondaryButton
 *   title="Cancel"
 *   onPress={handleCancel}
 * />
 * 
 * // With loading state
 * <SecondaryButton
 *   title="Checking..."
 *   loading={isValidating}
 * />
 * ```
 */
export const SecondaryButton: React.FC<ButtonProps> = ({
  title,
  onPress,
  disabled = false,
  loading = false,
}) => {
  const displayTitle = loading ? 'Loading...' : title;
  
  return (
    <Pressable
      style={({ pressed }) => [
        styles.secondaryButton,
        disabled && styles.disabled,
        pressed && styles.pressed,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      <Text style={styles.secondaryButtonText}>
        {displayTitle}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  primaryButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingHorizontal: 32,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#e1e5e9',
    borderRadius: 8,
    paddingHorizontal: 32,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabled: {
    opacity: 0.6,
  },
  pressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Nunito_500Medium',
    textAlign: 'center',
  },
  secondaryButtonText: {
    color: '#1a1a1a',
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Nunito_500Medium',
    textAlign: 'center',
  },
});