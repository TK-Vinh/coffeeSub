import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { useRouter } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { AuthFacade } from '@/facades/AuthFacade';
import { useAuth } from '@/hooks/useAuth';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';

const auth = new AuthFacade();
WebBrowser.maybeCompleteAuthSession();

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn: setAuth } = useAuth();
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID,
  });

  const handleSignIn = async () => {
    try {
      const { token } = await auth.signIn({ email, password });
      await setAuth(token, email);
      Alert.alert('Success', 'Signed in successfully');
      router.replace('/(tabs)');
    } catch (e) {
      const message = e instanceof Error ? e.message : String(e);
      Alert.alert('Sign in failed', message);
    }
  };

  const handleGoogleSignIn = async (idToken: string) => {
    try {
      const { token } = await auth.googleLogin(idToken);
      const profile = await auth.currentUser(token);
      await setAuth(token, profile.email);
      router.replace('/(tabs)');
    } catch (e) {
      const message = e instanceof Error ? e.message : String(e);
      Alert.alert('Google sign in failed', message);
    }
  };

  useEffect(() => {
    if (response?.type === 'success') {
      const idToken = response.params.id_token;
      if (idToken) {
        handleGoogleSignIn(idToken);
      }
    }
  }, [response]);

  const textColor = useThemeColor({}, 'text');
  return (
    <ThemedView style={styles.container} useSafeArea>
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
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
      <Button mode="contained" onPress={handleSignIn} style={styles.button}>
        Sign In
      </Button>
      <Button
        icon="google"
        mode="outlined"
        onPress={() => promptAsync()}
        style={styles.button}
        disabled={!request}
      >
        Sign in with Google
      </Button>
      <View style={styles.separator}>
        <Text style={[styles.separatorText, { color: textColor }]}>If you don&apos;t have an account</Text>
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
