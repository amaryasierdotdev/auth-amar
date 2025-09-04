import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import { Alert } from 'react-native';
import { 
  User, 
  AuthState, 
  LoginCredentials, 
  SignupCredentials, 
  AuthResponse 
} from '../types/auth.types';
import { saveUserToStorage, loadUserFromStorage, clearAuthStorage } from '../utils/storage';

/**
 * Authentication context type definition
 * 
 * Extends AuthState with authentication methods. Provides the complete
 * authentication interface including state and actions.
 * 
 * @interface AuthContextType
 * @extends AuthState
 */
interface AuthContextType extends AuthState {
  /** Authenticate user with email and password */
  login: (credentials: LoginCredentials) => Promise<AuthResponse>;
  /** Register new user account */
  signup: (credentials: SignupCredentials) => Promise<AuthResponse>;
  /** Sign out current user and clear session */
  logout: () => Promise<void>;
}

/**
 * React Context for authentication state and methods
 * 
 * Provides authentication state and actions throughout the component tree.
 * Must be consumed within an AuthProvider.
 */
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Hook to access authentication context
 * 
 * Provides access to authentication state and methods. Must be used
 * within an AuthProvider or will throw an error.
 * 
 * @returns {AuthContextType} Authentication context with state and methods
 * @throws {Error} When used outside of AuthProvider
 * 
 * @example
 * ```typescript
 * function LoginScreen() {
 *   const { login, isLoading, isAuthenticated } = useAuth();
 *   
 *   const handleLogin = async () => {
 *     const result = await login({ email, password });
 *     if (result.success) {
 *       // Handle successful login
 *     }
 *   };
 *   
 *   return (
 *     <View>
 *       {isAuthenticated ? <WelcomeMessage /> : <LoginForm />}
 *     </View>
 *   );
 * }
 * ```
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

/**
 * Props for the AuthProvider component
 * 
 * @interface AuthProviderProps
 */
interface AuthProviderProps {
  /** Child components that will have access to authentication context */
  children: ReactNode;
}

/**
 * Authentication Provider Component
 * 
 * Manages authentication state and provides authentication methods
 * to child components via React Context. Handles user session persistence,
 * login, signup, and logout operations.
 * 
 * Features:
 * - Automatic session restoration from AsyncStorage
 * - Form validation for auth operations
 * - Loading states during async operations
 * - Error handling with user-friendly alerts
 * - Mock authentication (ready for API integration)
 * 
 * @component
 * @param {AuthProviderProps} props - Component props
 * @param {ReactNode} props.children - Child components to provide context to
 * 
 * @example
 * ```tsx
 * function App() {
 *   return (
 *     <AuthProvider>
 *       <Navigation />
 *     </AuthProvider>
 *   );
 * }
 * ```
 */
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: false,
    isAuthenticated: false,
    isInitializing: true,
  });

  // Load persisted user data on app start
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const persistedUser = await loadUserFromStorage();
        if (persistedUser) {
          setAuthState({
            user: persistedUser,
            isLoading: false,
            isAuthenticated: true,
            isInitializing: false,
          });
        } else {
          setAuthState(prev => ({
            ...prev,
            isInitializing: false,
          }));
        }
      } catch (error) {
        console.error('Failed to initialize auth:', error);
        // Fallback to unauthenticated state on error
        setAuthState(prev => ({
          ...prev,
          isInitializing: false,
        }));
      }
    };

    initializeAuth();
  }, []);

  /**
   * Authenticate user with email and password
   * 
   * Validates input credentials, performs authentication (currently mocked),
   * updates auth state, and persists user session to AsyncStorage.
   * 
   * @param {LoginCredentials} credentials - User login credentials
   * @param {string} credentials.email - User's email address
   * @param {string} credentials.password - User's password
   * @returns {Promise<AuthResponse>} Authentication result with success status
   * 
   * @example
   * ```typescript
   * const { login } = useAuth();
   * 
   * const handleLogin = async () => {
   *   const result = await login({
   *     email: 'user@example.com',
   *     password: 'password123'
   *   });
   *   
   *   if (result.success) {
   *     console.log('Login successful', result.user);
   *   } else {
   *     console.error('Login failed', result.error);
   *   }
   * };
   * ```
   */
  const login = useCallback(async (credentials: LoginCredentials): Promise<AuthResponse> => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true }));
      
      // Validate inputs
      if (!credentials.email || !credentials.password) {
        throw new Error('Email and password are required');
      }
      
      if (!credentials.email.includes('@')) {
        throw new Error('Please enter a valid email');
      }
      
      // Mock authentication - replace with actual API call later
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
      
      // Mock success for demo purposes
      const mockUser: User = {
        id: Date.now().toString(),
        email: credentials.email,
        name: credentials.email.split('@')[0],
      };
      
      setAuthState({
        user: mockUser,
        isLoading: false,
        isAuthenticated: true,
        isInitializing: false,
      });
      
      // Save user to storage for persistence
      await saveUserToStorage(mockUser);
      
      return { success: true, user: mockUser };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed';
      setAuthState(prev => ({ ...prev, isLoading: false }));
      Alert.alert('Login Error', errorMessage);
      return { success: false, error: errorMessage };
    }
  }, []);

  /**
   * Register new user account
   * 
   * Validates signup credentials, creates new user account (currently mocked),
   * updates auth state, and persists user session to AsyncStorage.
   * 
   * @param {SignupCredentials} credentials - New user registration data
   * @param {string} credentials.name - User's full name (min 2 characters)
   * @param {string} credentials.email - User's email address
   * @param {string} credentials.password - User's password (min 6 characters)
   * @returns {Promise<AuthResponse>} Registration result with success status
   * 
   * @example
   * ```typescript
   * const { signup } = useAuth();
   * 
   * const handleSignup = async () => {
   *   const result = await signup({
   *     name: 'John Doe',
   *     email: 'john@example.com',
   *     password: 'securePassword123'
   *   });
   *   
   *   if (result.success) {
   *     console.log('Account created', result.user);
   *   } else {
   *     console.error('Signup failed', result.error);
   *   }
   * };
   * ```
   */
  const signup = useCallback(async (credentials: SignupCredentials): Promise<AuthResponse> => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true }));
      
      // Validate inputs
      if (!credentials.email || !credentials.password || !credentials.name) {
        throw new Error('All fields are required');
      }
      
      if (!credentials.email.includes('@')) {
        throw new Error('Please enter a valid email');
      }
      
      if (credentials.password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }
      
      // Mock signup - replace with actual API call later
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
      
      const mockUser: User = {
        id: Date.now().toString(),
        email: credentials.email,
        name: credentials.name,
      };
      
      setAuthState({
        user: mockUser,
        isLoading: false,
        isAuthenticated: true,
        isInitializing: false,
      });
      
      // Save user to storage for persistence
      await saveUserToStorage(mockUser);
      
      return { success: true, user: mockUser };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Signup failed';
      setAuthState(prev => ({ ...prev, isLoading: false }));
      Alert.alert('Signup Error', errorMessage);
      return { success: false, error: errorMessage };
    }
  }, []);

  /**
   * Sign out current user and clear session
   * 
   * Clears user data from AsyncStorage, resets authentication state
   * to logged-out state. Always succeeds and doesn't throw errors.
   * 
   * @returns {Promise<void>} Promise that resolves when logout is complete
   * 
   * @example
   * ```typescript
   * const { logout } = useAuth();
   * 
   * const handleLogout = async () => {
   *   await logout();
   *   console.log('User logged out successfully');
   * };
   * ```
   */
  const logout = useCallback(async () => {
    // Clear user data from storage
    await clearAuthStorage();
    
    setAuthState({
      user: null,
      isLoading: false,
      isAuthenticated: false,
      isInitializing: false,
    });
  }, []);

  const value: AuthContextType = {
    ...authState,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;