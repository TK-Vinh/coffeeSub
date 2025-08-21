import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Card, List, Switch, Text } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useAuth } from '@/hooks/useAuth';
import { ThemedView } from '@/components/ThemedView';
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
        <Card style={styles.card}>
          <Card.Title title={user.fullName} subtitle={user.email} />
          <Card.Content>
            <List.Section>
              <List.Item title="ID" description={`${user.id}`} />
              <List.Item title="Username" description={user.username} />
              <List.Item title="Phone" description={user.phoneNumber} />
              <List.Item title="Role" description={user.role} />
              <List.Item title="Plan ID" description={`${user.userSubscriptions.planId}`} />
              <List.Item title="Remaining Cups" description={`${user.userSubscriptions.remainingCups}`} />
            </List.Section>
          </Card.Content>
        </Card>
      ) : (
        email && <Text style={styles.info}>{email}</Text>
      )}
      <Switch style={styles.switch} value={colorScheme === 'dark'} onValueChange={toggleScheme} />
      {!token && (
        <Button mode="contained" onPress={handleSignIn} style={styles.signInButton}>
          Sign In
        </Button>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16 },
  info: { marginBottom: 8 },
  card: { width: '100%', marginBottom: 16 },
  switch: { marginVertical: 16 },
  signInButton: { marginTop: 8 },
});
