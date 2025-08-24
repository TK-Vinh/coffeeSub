import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { AuthFacade } from '@/facades/AuthFacade';
import { useAuth } from '@/hooks/useAuth';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';

const auth = new AuthFacade();

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn: setAuth } = useAuth();

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
