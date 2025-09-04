/**
 * Navigation parameter list for authentication screens
 * 
 * Defines the available screens and their required parameters
 * for unauthenticated user flow.
 * 
 * @type AuthStackParamList
 * @example
 * ```typescript
 * // Navigate to login screen
 * navigation.navigate('Login');
 * 
 * // Navigate to signup screen  
 * navigation.navigate('Signup');
 * ```
 */
export type AuthStackParamList = {
  /** Login screen - no parameters required */
  Login: undefined;
  /** Signup/registration screen - no parameters required */
  Signup: undefined;
};

/**
 * Navigation parameter list for authenticated user screens
 * 
 * Defines the available screens and their required parameters
 * for authenticated user flow.
 * 
 * @type MainStackParamList
 * @example
 * ```typescript
 * // Navigate to home screen after successful login
 * navigation.navigate('Home');
 * ```
 */
export type MainStackParamList = {
  /** Home/dashboard screen - no parameters required */
  Home: undefined;
};

/**
 * Combined navigation parameter list for the entire application
 * 
 * Union of all available screens from both authenticated and
 * unauthenticated flows. Used for type-safe navigation throughout the app.
 * 
 * @type RootStackParamList
 * @example
 * ```typescript
 * type NavigationProp = StackNavigationProp<RootStackParamList>;
 * 
 * // Type-safe navigation to any screen
 * const navigation = useNavigation<NavigationProp>();
 * navigation.navigate('Login'); // Valid
 * navigation.navigate('Home');  // Valid
 * navigation.navigate('Unknown'); // TypeScript error
 * ```
 */
export type RootStackParamList = AuthStackParamList & MainStackParamList;