import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useFonts, 
  Nunito_400Regular,
  Nunito_500Medium, 
  Nunito_600SemiBold,
  Nunito_700Bold 
} from '@expo-google-fonts/nunito';
import { TamaguiProvider } from '@tamagui/core';
import { AuthProvider, ThemeProvider, useTheme } from './src/context';
import { AppNavigation } from './src/navigation';
import tamaguiConfig from './tamagui.config';

const AppWithTheme: React.FC = () => {
  const { theme, isLoading: themeLoading } = useTheme();

  if (themeLoading) {
    return (
      <View style={{ 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: theme === 'dark' ? '#000000' : '#f8f9fa'
      }}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={{ 
          marginTop: 16, 
          fontSize: 16, 
          color: theme === 'dark' ? '#ffffff' : '#666',
          fontWeight: '500'
        }}>
          Loading theme...
        </Text>
      </View>
    );
  }

  return (
    <TamaguiProvider config={tamaguiConfig} defaultTheme={theme}>
      <AuthProvider>
        <AppNavigation />
      </AuthProvider>
    </TamaguiProvider>
  );
};

export default function App() {
  const [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_500Medium,
    Nunito_600SemiBold,
    Nunito_700Bold,
  });

  if (!fontsLoaded) {
    return (
      <View style={{ 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: '#f8f9fa'
      }}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={{ 
          marginTop: 16, 
          fontSize: 16, 
          color: '#666',
          fontWeight: '500'
        }}>
          Loading fonts...
        </Text>
      </View>
    );
  }

  return (
    <ThemeProvider>
      <AppWithTheme />
    </ThemeProvider>
  );
}
