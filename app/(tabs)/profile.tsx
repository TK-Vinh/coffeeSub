import React from 'react';
import { StyleSheet } from 'react-native';
import { Appbar, Button, Card, List, Text } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

import { useAuth } from '@/hooks/useAuth';
import { ThemedView } from '@/components/ThemedView';
import { useColorScheme, useToggleColorScheme } from '@/hooks/useColorScheme';

export default function Profile() {
  const router = useRouter();
  const { token, email, signOut, profile: user } = useAuth();
  const colorScheme = useColorScheme();
  const toggleScheme = useToggleColorScheme();

  const handleSignIn = () => {
    router.replace('/sign-in');
  };

  return (
    <ThemedView style={styles.container} useSafeArea>
      <Appbar.Header>
        <Appbar.Content title="Profile" />
        <Appbar.Action
          icon={({ size, color }) => (
            <MaterialIcons
              name={colorScheme === 'dark' ? 'light-mode' : 'dark-mode'}
              size={size}
              color={color}
            />
          )}
          onPress={toggleScheme}
        />
      </Appbar.Header>
      {user ? (
        <Card style={styles.card}>
          <Card.Title title={user.fullName} subtitle={user.email} />
          <Card.Content>
            <List.Section>
              <List.Item title="Username" description={user.username} />
              <List.Item title="Phone" description={user.phoneNumber} />
              <List.Item title="Role" description={user.role} />
              <List.Item title="Remaining Cups" description={`${user.userSubscriptions.remainingCups}`} />
            </List.Section>
          </Card.Content>
        </Card>
      ) : (
        email && <Text style={styles.info}>{email}</Text>
      )}
      {!token ? (
        <Button mode="contained" onPress={handleSignIn} style={styles.signInButton}>
          Sign In
        </Button>
      ) : (
        <Button mode="outlined" onPress={signOut} style={styles.signOutButton}>
          Sign Out
        </Button>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  info: { marginBottom: 8, padding: 16 },
  card: { margin: 16 },
  signInButton: { marginHorizontal: 16, marginTop: 8 },
  signOutButton: { marginHorizontal: 16, marginTop: 8 },
});
