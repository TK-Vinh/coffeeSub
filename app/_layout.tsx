import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { AuthProvider } from '@/hooks/useAuth';
import { ColorSchemeProvider, useColorScheme } from '@/hooks/useColorScheme';

import ToastManager from 'toastify-react-native';
import { Provider as PaperProvider } from 'react-native-paper';

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ColorSchemeProvider>
      <RootNavigation />
    </ColorSchemeProvider>
  );
}

function RootNavigation() {
  const colorScheme = useColorScheme();

  return (
    <AuthProvider>
      <PaperProvider>
        <ToastManager />
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="sign-in" options={{ title: 'Sign In' }} />
            <Stack.Screen name="sign-up" options={{ title: 'Sign Up' }} />
            <Stack.Screen name="coffee/[id]" options={{ title: 'Coffee Detail' }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
          <StatusBar style="auto" />
        </ThemeProvider>
      </PaperProvider>
    </AuthProvider>
  );
}
