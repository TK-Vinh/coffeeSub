import { ThemedView } from '@/components/ThemedView';
import { AuthFacade } from '@/facades/AuthFacade';
import { useAuth } from '@/hooks/useAuth';
import { useThemeColor } from '@/hooks/useThemeColor';
import { makeRedirectUri } from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import Constants, { ExecutionEnvironment } from 'expo-constants';
import { useRouter } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import React, { useEffect, useMemo, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';

WebBrowser.maybeCompleteAuthSession();

const auth = new AuthFacade();

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn: setAuth } = useAuth();
  const textColor = useThemeColor({}, 'text');

  // ✅ Correct redirect handling
  const redirectUri = useMemo(() => {
    if (Constants.executionEnvironment === ExecutionEnvironment.StoreClient) {
      // Expo Go (dev) → must use Web Client + Expo proxy redirect
      return 'https://auth.expo.io/@genchio/coffeeSub';
    }
    // EAS builds (standalone) → use app scheme
    return makeRedirectUri({ scheme: 'coffeesub' });
  }, []);

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,   // Web Client ID
    androidClientId: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID,
    iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
    redirectUri,
  });

  useEffect(() => {
    (async () => {
      if (response?.type === 'success') {
        const { id_token: idToken } = response.params ?? {};
        if (!idToken) {
          Alert.alert('Google Sign-In', 'Missing idToken');
          return;
        }
        try {
          // Exchange Google idToken -> backend JWT
          const { token } = await auth.googleLogin(idToken);
          await setAuth(token, '');
          router.replace('/(tabs)');
        } catch (e) {
          const message = e instanceof Error ? e.message : String(e);
          Alert.alert('Google login failed', message);
        }
      }
    })();
  }, [response, router, setAuth]);

  const handleSignIn = async () => {
    setLoading(true);
    try {
      const { token } = await auth.signIn({ email, password });
      await setAuth(token, email);
      router.replace('/(tabs)');
    } catch (e) {
      const message = e instanceof Error ? e.message : String(e);
      Alert.alert('Sign in failed', message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemedView style={styles.container} useSafeArea>
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        mode="outlined"
        style={styles.input}
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        mode="outlined"
        style={styles.input}
      />
      <Button
        mode="contained"
        onPress={handleSignIn}
        style={styles.button}
        loading={loading}
        disabled={loading}
      >
        Sign In
      </Button>
      <Button
        mode="outlined"
        disabled={!request}
        onPress={() => promptAsync()}
        style={styles.button}
      >
        Sign In with Google
      </Button>
      <View style={styles.separator}>
        <Text style={[styles.separatorText, { color: textColor }]}>
          If you don&apos;t have an account
        </Text>
        <Button onPress={() => router.replace('/sign-up')}>Sign Up</Button>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 16 },
  input: { marginBottom: 12 },
  button: { marginTop: 4 },
  separator: { marginTop: 24, alignItems: 'center' },
  separatorText: { marginBottom: 8 },
});
