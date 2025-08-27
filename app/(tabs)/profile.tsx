import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Appbar, Button, Card, List, Subheading, Text, Title } from 'react-native-paper';

import { ThemedView } from '@/components/ThemedView';
import { AuthFacade, User } from '@/facades/AuthFacade';
import { useAuth } from '@/hooks/useAuth';
import { useColorScheme, useToggleColorScheme } from '@/hooks/useColorScheme';
import { useThemeColor } from '@/hooks/useThemeColor';

const auth = new AuthFacade();

export default function Profile() {
  const router = useRouter();
  const { token, email, signOut } = useAuth();
  const colorScheme = useColorScheme();
  const toggleScheme = useToggleColorScheme();
  const [user, setUser] = useState<User | null>(null);
  const cardColor = useThemeColor({}, 'card');

  useEffect(() => {
    if (!token) {
      setUser(null);
      return;
    }
    auth
      .currentUser(token)
      .then(setUser)
      .catch((e) => console.error(e));
  }, [token]);

  const handleSignIn = () => {
    router.replace('/sign-in');
  };

  return (
    <ThemedView style={styles.container} useSafeArea>
      <Appbar.Header style={styles.appBar}>
        <Appbar.Content title="Profile" titleStyle={styles.appBarTitle} />
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

      <View style={styles.content}>
        {user ? (
          <Card style={[styles.card, { backgroundColor: cardColor }]}>
            <Card.Content>
              <Title style={styles.userName}>{user.fullName}</Title>
              <Subheading style={styles.userEmail}>{user.email}</Subheading>
              
              <View style={styles.infoSection}>
                <List.Item
                  title="Username"
                  description={user.username}
                  left={() => <List.Icon icon="account-circle-outline" />}
                />
                <List.Item
                  title="Phone"
                  description={user.phoneNumber}
                  left={() => <List.Icon icon="phone-outline" />}
                />
                <List.Item
                  title="Role"
                  description={user.role}
                  left={() => <List.Icon icon="shield-account-outline" />}
                />
                <List.Item
                  title="Remaining Cups"
                  description={`${user.userSubscriptions.remainingCups}`}
                  left={() => <List.Icon icon="ticket-outline" />}
                />
              </View>
            </Card.Content>
          </Card>
        ) : (
          email && <Text style={styles.info}>{email}</Text>
        )}
      </View>

      <View style={styles.buttonContainer}>
        {!token ? (
          <Button mode="contained" onPress={handleSignIn} style={styles.button}>
            Sign In
          </Button>
        ) : (
          <Button mode="outlined" onPress={signOut} style={styles.button}>
            Sign Out
          </Button>
        )}
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  appBar: {
    backgroundColor: 'transparent',
    elevation: 0,
  },
  appBarTitle: {
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  card: {
    borderRadius: 12,
    elevation: 4,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
  },
  userEmail: {
    textAlign: 'center',
    marginBottom: 20,
    color: 'gray',
  },
  infoSection: {
    marginTop: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: 'lightgray',
    paddingTop: 16,
  },
  info: { padding: 16, textAlign: 'center' },
  buttonContainer: {
    padding: 16,
  },
  button: {
    marginVertical: 8,
  },
});