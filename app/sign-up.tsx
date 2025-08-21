import React, { useState } from 'react';
import { TextInput, Button, StyleSheet, Alert, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { AuthFacade } from '@/facades/AuthFacade';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';

const auth = new AuthFacade();

export default function SignUp() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    await auth.signUp({ email, password });
    Alert.alert('Account created', 'Please sign in');
    router.replace('/sign-in');
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
      <Button title="Sign Up" onPress={handleSignUp} />
      <View style={styles.separator}>
        <Text style={[styles.separatorText, { color: textColor }]}>If you already have one</Text>
        <Button title="Sign In" onPress={() => router.replace('/sign-in')} />
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
