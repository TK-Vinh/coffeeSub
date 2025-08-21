import React, { useState } from 'react';
import { StyleSheet, Alert, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
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

  const textColor = useThemeColor({}, 'text');
  return (
    <ThemedView style={styles.container}>
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
      <Button mode="contained" onPress={handleSignUp} style={styles.button}>
        Sign Up
      </Button>
      <View style={styles.separator}>
        <Text style={[styles.separatorText, { color: textColor }]}>If you already have one</Text>
        <Button onPress={() => router.replace('/sign-in')}>Sign In</Button>
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
