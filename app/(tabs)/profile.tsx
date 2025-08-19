import React from 'react';
import { Button, StyleSheet, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import { AuthFacade } from '@/facades/AuthFacade';
import { useAuth } from '@/hooks/useAuth';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useColorScheme, useToggleColorScheme } from '@/hooks/useColorScheme';

const auth = new AuthFacade();

export default function Profile() {
  const router = useRouter();
  const { token, email, signOut } = useAuth();
  const colorScheme = useColorScheme();
  const toggleScheme = useToggleColorScheme();

  const handleSignOut = async () => {
    await auth.signOut();
    signOut();
    router.replace('/');
  };

  return (
    <ThemedView style={styles.container}>
      {email && <ThemedText style={styles.info}>{email}</ThemedText>}
      {token && (
        <ThemedView style={styles.qrContainer}>
          <IconSymbol
            size={200}
            name="qrcode"
            color={colorScheme === 'dark' ? 'white' : 'black'}
          />
          <ThemedText selectable style={styles.code}>
            {token}
          </ThemedText>
        </ThemedView>
      )}
      <Switch value={colorScheme === 'dark'} onValueChange={toggleScheme} />
      <Button title="Sign Out" onPress={handleSignOut} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16 },
  info: { marginBottom: 24 },
  qrContainer: { alignItems: 'center', marginBottom: 24 },
  code: { marginTop: 8, fontSize: 12, textAlign: 'center' },
});
