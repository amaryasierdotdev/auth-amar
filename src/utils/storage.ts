import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../types/auth.types';

const AUTH_USER_KEY = 'AUTH_USER';

/**
 * Save user data to AsyncStorage
 */
export const saveUserToStorage = async (user: User): Promise<void> => {
  try {
    const userData = JSON.stringify(user);
    await AsyncStorage.setItem(AUTH_USER_KEY, userData);
  } catch (error) {
    console.error('Failed to save user to storage:', error);
    // Don't throw error to prevent app crashes - just log it
  }
};

/**
 * Load user data from AsyncStorage
 */
export const loadUserFromStorage = async (): Promise<User | null> => {
  try {
    const userData = await AsyncStorage.getItem(AUTH_USER_KEY);
    if (userData) {
      return JSON.parse(userData) as User;
    }
    return null;
  } catch (error) {
    console.error('Failed to load user from storage:', error);
    return null; // Return null on error to fall back to unauthenticated state
  }
};

/**
 * Remove user data from AsyncStorage
 */
export const removeUserFromStorage = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(AUTH_USER_KEY);
  } catch (error) {
    console.error('Failed to remove user from storage:', error);
    // Don't throw error to prevent app crashes - just log it
  }
};

/**
 * Clear all authentication-related data from AsyncStorage
 */
export const clearAuthStorage = async (): Promise<void> => {
  try {
    await removeUserFromStorage();
    // In the future, we can add more auth-related keys here if needed
  } catch (error) {
    console.error('Failed to clear auth storage:', error);
  }
};