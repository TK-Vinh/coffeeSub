import React, { useState } from 'react';
import { TextInput, Button, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
// eslint-disable-next-line import/no-unresolved
import { Toast } from 'toastify-react-native';
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
      setAuth(token, email);
      Toast.success('Signed in successfully');
      router.replace('/(tabs)');
    } catch (e) {
      const message = e instanceof Error ? e.message : String(e);
      Toast.error(message);
    }
  };

  const borderColor = useThemeColor({}, 'icon');
  const textColor = useThemeColor({}, 'text');
  return (
    <ThemedView style={styles.container}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={[styles.input, { borderColor, color: textColor }]}
        placeholderTextColor={borderColor}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={[styles.input, { borderColor, color: textColor }]}
        placeholderTextColor={borderColor}
      />
      <Button title="Sign In" onPress={handleSignIn} />
      <View style={styles.separator}>
        <Text style={[styles.separatorText, { color: textColor }]}>If you don&apos;t have an account</Text>
        <Button title="Sign Up" onPress={() => router.replace('/sign-up')} />
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 16 },
  input: { borderWidth: 1, marginBottom: 12, padding: 8 },
  separator: { marginTop: 16, alignItems: 'center' },
  separatorText: { marginBottom: 8 },
});
