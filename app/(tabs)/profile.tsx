import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/hooks/useAuth';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useColorScheme, useToggleColorScheme } from '@/hooks/useColorScheme';
import { AuthFacade, User } from '@/facades/AuthFacade';

const auth = new AuthFacade();

export default function Profile() {
  const router = useRouter();
  const { token, email } = useAuth();
  const colorScheme = useColorScheme();
  const toggleScheme = useToggleColorScheme();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (!token) return;
    auth
      .currentUser(token)
      .then(setUser)
      .catch((e) => console.error(e));
  }, [token]);

  const handleSignIn = () => {
    router.replace('/sign-in');
  };

  return (
    <ThemedView style={styles.container}>
      {user ? (
        <ThemedText style={styles.info}>{user.fullName}</ThemedText>
      ) : (
        email && <ThemedText style={styles.info}>{email}</ThemedText>
      )}
      {token && (
        <ThemedView style={styles.qrContainer}>
          <IconSymbol
            size={200}
            name="qrcode"
            color={colorScheme === 'dark' ? 'white' : 'black'}
          />
          <ThemedText selectable style={styles.code}>{token}</ThemedText>
        </ThemedView>
      )}
      <Switch value={colorScheme === 'dark'} onValueChange={toggleScheme} />
      {!token && <Button title="Sign In" onPress={handleSignIn} />}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16 },
  info: { marginBottom: 24 },
  qrContainer: { alignItems: 'center', marginBottom: 24 },
  code: { marginTop: 8, fontSize: 12, textAlign: 'center' },
});
