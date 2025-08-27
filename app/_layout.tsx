import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { AuthProvider } from '@/hooks/useAuth';
import { ColorSchemeProvider, useColorScheme } from '@/hooks/useColorScheme';
import { Provider as PaperProvider, MD3DarkTheme, MD3LightTheme } from 'react-native-paper';
import { Colors } from '@/constants/Colors';
import ToastManager from 'toastify-react-native';

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
  const isDark = colorScheme === 'dark';

  const navigationTheme = isDark
    ? {
        ...DarkTheme,
        colors: {
          ...DarkTheme.colors,
          background: Colors.dark.background,
          card: Colors.dark.card,
          primary: Colors.dark.tint,
          text: Colors.dark.text,
          border: Colors.dark.icon,
        },
      }
    : {
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          background: Colors.light.background,
          card: Colors.light.card,
          primary: Colors.light.tint,
          text: Colors.light.text,
          border: Colors.light.icon,
        },
      };

  const paperTheme = isDark
    ? {
        ...MD3DarkTheme,
        colors: {
          ...MD3DarkTheme.colors,
          background: Colors.dark.background,
          surface: Colors.dark.card,
          primary: Colors.dark.tint,
          onPrimary: Colors.dark.text,
          onSurface: Colors.dark.text,
        },
      }
    : {
        ...MD3LightTheme,
        colors: {
          ...MD3LightTheme.colors,
          background: Colors.light.background,
          surface: Colors.light.card,
          primary: Colors.light.tint,
          onPrimary: Colors.light.text,
          onSurface: Colors.light.text,
        },
      };

  return (
    <AuthProvider>
      <PaperProvider theme={paperTheme}>
        <ThemeProvider value={navigationTheme}>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="sign-in" options={{ title: 'Sign In' }} />
            <Stack.Screen name="sign-up" options={{ title: 'Sign Up' }} />
            <Stack.Screen name="coffee/[id]" options={{ title: 'Coffee Detail' }} />
            <Stack.Screen name="plan/[id]" options={{ title: 'Plan Detail' }} />
            <Stack.Screen name="vnpay" options={{ title: 'VNPAY' }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
          <StatusBar style="auto" />
          <ToastManager />
        </ThemeProvider>
      </PaperProvider>
    </AuthProvider>
  );
}
