/**
 * Represents an authenticated user in the system
 * 
 * @interface User
 */
export interface User {
  /** Unique identifier for the user */
  id: string;
  /** User's email address, used for authentication */
  email: string;
  /** User's display name */
  name: string;
}

/**
 * Application authentication state
 * 
 * Manages the current authentication status and user session state.
 * Used throughout the app to determine access control and UI states.
 * 
 * @interface AuthState
 */
export interface AuthState {
  /** Currently authenticated user, null if not logged in */
  user: User | null;
  /** Loading state for async authentication operations (login, signup, logout) */
  isLoading: boolean;
  /** Whether user is currently authenticated and has valid session */
  isAuthenticated: boolean;
  /** Initial app startup loading state for auth persistence check */
  isInitializing: boolean;
}

/**
 * User credentials required for login authentication
 * 
 * @interface LoginCredentials
 * @example
 * ```typescript
 * const credentials: LoginCredentials = {
 *   email: 'user@example.com',
 *   password: 'securePassword123'
 * };
 * ```
 */
export interface LoginCredentials {
  /** User's email address - must be valid email format */
  email: string;
  /** User's password - minimum 6 characters required */
  password: string;
}

/**
 * User credentials required for account registration
 * 
 * Extends LoginCredentials with additional required fields for new user creation.
 * 
 * @interface SignupCredentials
 * @extends LoginCredentials
 * @example
 * ```typescript
 * const newUser: SignupCredentials = {
 *   name: 'John Doe',
 *   email: 'john@example.com',
 *   password: 'securePassword123'
 * };
 * ```
 */
export interface SignupCredentials extends LoginCredentials {
  /** User's full name - minimum 2 characters required */
  name: string;
}

/**
 * Response object returned from authentication operations
 * 
 * Standardized response format for login, signup, and other auth operations.
 * Always includes success flag, with conditional user data or error message.
 * 
 * @interface AuthResponse
 * @example
 * ```typescript
 * // Successful authentication
 * const response: AuthResponse = {
 *   success: true,
 *   user: { id: '123', email: 'user@example.com', name: 'John Doe' }
 * };
 * 
 * // Failed authentication
 * const response: AuthResponse = {
 *   success: false,
 *   error: 'Invalid credentials provided'
 * };
 * ```
 */
export interface AuthResponse {
  /** Whether the authentication operation was successful */
  success: boolean;
  /** User object returned on successful authentication */
  user?: User;
  /** Error message returned on failed authentication */
  error?: string;
}