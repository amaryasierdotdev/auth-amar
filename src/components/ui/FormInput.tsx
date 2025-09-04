import React, { useState } from 'react';
import { TextInput, Pressable } from 'react-native';
import { styled, Text } from '@tamagui/core';
import { YStack, XStack } from '@tamagui/stacks';
import { Eye, EyeOff } from '@tamagui/lucide-icons';

const StyledInput = styled(TextInput, {
  backgroundColor: '$backgroundSecondary',
  borderColor: '$borderColor',
  borderWidth: 1,
  borderRadius: 8,
  paddingHorizontal: 16,
  paddingVertical: 16,
  flex: 1,
  
  variants: {
    hasError: {
      true: {
        borderColor: '$error',
        backgroundColor: '$backgroundTertiary',
      },
    },
    disabled: {
      true: {
        opacity: 0.6,
        backgroundColor: '$backgroundTertiary',
      },
    },
  } as const,
});

const Label = styled(Text, {
  fontSize: 16,
  fontWeight: '500',
  color: '$color',
  marginBottom: 8,
  fontFamily: 'Nunito_500Medium',
});

const ErrorText = styled(Text, {
  fontSize: 14,
  color: '$error',
  marginTop: 4,
  fontFamily: 'Nunito_400Regular',
});

/**
 * Props for the FormInput component
 * 
 * Comprehensive form input with validation, theming, and accessibility support.
 * Includes password visibility toggle and various input types.
 * 
 * @interface FormInputProps
 */
interface FormInputProps {
  /** Optional label text displayed above the input field */
  label?: string;
  /** Error message displayed below the input when validation fails */
  error?: string;
  /** Whether the input is disabled (non-interactive) */
  disabled?: boolean;
  /** Placeholder text shown when input is empty */
  placeholder?: string;
  /** Current input value (controlled component) */
  value?: string;
  /** Callback fired when input value changes */
  onChangeText?: (text: string) => void;
  /** Whether to hide input text (for passwords) */
  secureTextEntry?: boolean;
  /** Keyboard type to display for input */
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  /** Auto-capitalization behavior */
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  /** Whether to enable auto-correct */
  autoCorrect?: boolean;
  /** Show password visibility toggle icon (only works with secureTextEntry=true) */
  showPasswordToggle?: boolean;
}

/**
 * FormInput - Reusable form input component with validation and theming
 * 
 * A comprehensive form input component that supports:
 * - Theme-aware styling (light/dark mode)
 * - Password visibility toggle with eye icons
 * - Validation states with error messages
 * - Various input types (email, numeric, etc.)
 * - Accessibility features
 * - Disabled states
 * 
 * @component
 * @param {FormInputProps} props - Component props
 * 
 * @example
 * ```tsx
 * // Basic text input
 * <FormInput
 *   label="Full Name"
 *   value={name}
 *   onChangeText={setName}
 *   placeholder="Enter your full name"
 * />
 * 
 * // Email input with validation
 * <FormInput
 *   label="Email Address"
 *   value={email}
 *   onChangeText={setEmail}
 *   error={errors.email}
 *   keyboardType="email-address"
 *   autoCapitalize="none"
 * />
 * 
 * // Password input with visibility toggle
 * <FormInput
 *   label="Password"
 *   value={password}
 *   onChangeText={setPassword}
 *   secureTextEntry
 *   showPasswordToggle={true}
 *   error={errors.password}
 * />
 * 
 * // Disabled input
 * <FormInput
 *   label="Account Type"
 *   value="Premium"
 *   disabled={true}
 * />
 * ```
 */
export const FormInput: React.FC<FormInputProps> = ({
  label,
  error,
  disabled = false,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  autoCorrect = true,
  showPasswordToggle = false,
  ...rest
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  
  const shouldShowToggle = showPasswordToggle && secureTextEntry;
  const actualSecureTextEntry = shouldShowToggle ? !isPasswordVisible : secureTextEntry;
  
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  return (
    <YStack marginBottom={24}>
      {label && <Label>{label}</Label>}
      <XStack position="relative" alignItems="center">
        <StyledInput
          hasError={!!error}
          disabled={disabled}
          placeholder={placeholder}
          placeholderTextColor="$placeholderColor"
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={actualSecureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          autoCorrect={autoCorrect}
          editable={!disabled}
          style={{ 
            fontSize: 16, 
            fontFamily: 'Nunito_400Regular',
            flex: 1,
            paddingRight: shouldShowToggle ? 50 : 16 
          }}
          {...rest}
        />
        {shouldShowToggle && (
          <Pressable
            onPress={togglePasswordVisibility}
            style={{
              position: 'absolute',
              right: 16,
              width: 24,
              height: 24,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            disabled={disabled}
          >
            {isPasswordVisible ? (
              <EyeOff 
                size={18}
                color="$color"
                style={{ opacity: disabled ? 0.6 : 1 }}
              />
            ) : (
              <Eye 
                size={18}
                color="$color"
                style={{ opacity: disabled ? 0.6 : 1 }}
              />
            )}
          </Pressable>
        )}
      </XStack>
      {error && <ErrorText>{error}</ErrorText>}
    </YStack>
  );
};