import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/hooks/useAuth';
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
        <>
          <ThemedText style={styles.info}>ID: {user.id}</ThemedText>
          <ThemedText style={styles.info}>Username: {user.username}</ThemedText>
          <ThemedText style={styles.info}>Full name: {user.fullName}</ThemedText>
          <ThemedText style={styles.info}>Email: {user.email}</ThemedText>
          <ThemedText style={styles.info}>Phone: {user.phoneNumber}</ThemedText>
          <ThemedText style={styles.info}>Role: {user.role}</ThemedText>
          <ThemedText style={styles.info}>
            Plan ID: {user.userSubscriptions.planId}
          </ThemedText>
          <ThemedText style={styles.info}>
            Remaining Cups: {user.userSubscriptions.remainingCups}
          </ThemedText>
        </>
      ) : (
        email && <ThemedText style={styles.info}>{email}</ThemedText>
      )}
      <Switch value={colorScheme === 'dark'} onValueChange={toggleScheme} />
      {!token && <Button title="Sign In" onPress={handleSignIn} />}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16 },
  info: { marginBottom: 8 },
});
