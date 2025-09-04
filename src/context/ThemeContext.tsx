import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Available theme modes
 * 
 * @type ThemeName
 */
type ThemeName = 'light' | 'dark';

/**
 * Theme context type definition
 * 
 * Provides theme state and toggle functionality throughout the app.
 * Integrates with Tamagui's theming system for consistent UI adaptation.
 * 
 * @interface ThemeContextType
 */
interface ThemeContextType {
  /** Current active theme mode */
  theme: ThemeName;
  /** Function to toggle between light and dark themes */
  toggleTheme: () => void;
  /** Loading state during theme initialization from storage */
  isLoading: boolean;
}

/**
 * React Context for theme state and methods
 * 
 * Provides theme state and toggle functionality throughout the component tree.
 * Must be consumed within a ThemeProvider.
 */
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/** AsyncStorage key for persisting user's theme preference */
const THEME_STORAGE_KEY = '@app_theme';

/**
 * Props for the ThemeProvider component
 * 
 * @interface ThemeProviderProps
 */
interface ThemeProviderProps {
  /** Child components that will have access to theme context */
  children: ReactNode;
}

/**
 * Theme Provider Component
 * 
 * Manages theme state and provides theme switching functionality
 * to child components via React Context. Handles theme persistence
 * to AsyncStorage and integrates with Tamagui's theming system.
 * 
 * Features:
 * - Automatic theme restoration from AsyncStorage on app startup
 * - Seamless theme toggling between light and dark modes
 * - Persistent theme preferences across app sessions
 * - Loading states during theme initialization
 * - Error handling for storage operations
 * 
 * @component
 * @param {ThemeProviderProps} props - Component props
 * @param {ReactNode} props.children - Child components to provide theme context to
 * 
 * @example
 * ```tsx
 * function App() {
 *   return (
 *     <ThemeProvider>
 *       <TamaguiProvider defaultTheme="light">
 *         <Navigation />
 *       </TamaguiProvider>
 *     </ThemeProvider>
 *   );
 * }
 * ```
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeName>('light');
  const [isLoading, setIsLoading] = useState(true);

  // Load theme preference from storage on app startup
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
          setTheme(savedTheme as ThemeName);
        }
      } catch (error) {
        console.log('Error loading theme:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTheme();
  }, []);

  // Save theme preference when it changes
  const saveTheme = async (newTheme: ThemeName) => {
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, newTheme);
    } catch (error) {
      console.log('Error saving theme:', error);
    }
  };

  /**
   * Toggle between light and dark themes
   * 
   * Switches theme and persists the new preference to AsyncStorage.
   * Updates Tamagui theme provider automatically.
   */
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    saveTheme(newTheme);
  };

  const value: ThemeContextType = {
    theme,
    toggleTheme,
    isLoading,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * Hook to access theme context
 * 
 * Provides access to current theme state and toggle functionality.
 * Must be used within a ThemeProvider or will throw an error.
 * 
 * @returns {ThemeContextType} Theme context with current theme and toggle function
 * @throws {Error} When used outside of ThemeProvider
 * 
 * @example
 * ```typescript
 * function ThemeToggleButton() {
 *   const { theme, toggleTheme, isLoading } = useTheme();
 *   
 *   if (isLoading) {
 *     return <LoadingSpinner />;
 *   }
 *   
 *   return (
 *     <Button onPress={toggleTheme}>
 *       {theme === 'light' ? 'Switch to Dark' : 'Switch to Light'}
 *     </Button>
 *   );
 * }
 * 
 * // Using theme in styled components
 * function ThemedView() {
 *   const { theme } = useTheme();
 *   
 *   return (
 *     <View style={{
 *       backgroundColor: theme === 'light' ? '#ffffff' : '#000000'
 *     }}>
 *       <Text>Themed content</Text>
 *     </View>
 *   );
 * }
 * ```
 */
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};