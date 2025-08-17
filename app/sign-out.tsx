import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { AuthFacade } from '@/facades/AuthFacade';

const auth = new AuthFacade();

export default function SignOut() {
  const handleSignOut = async () => {
    await auth.signOut();
  };

  return (
    <View style={styles.container}>
      <Button title="Sign Out" onPress={handleSignOut} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 16 },
});
