import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { AuthFacade } from '@/facades/AuthFacade';
import { useAuth } from '@/hooks/useAuth';
import { IconSymbol } from '@/components/ui/IconSymbol';

const auth = new AuthFacade();

export default function Profile() {
  const router = useRouter();
  const { token, email, signOut } = useAuth();

  const handleSignOut = async () => {
    await auth.signOut();
    signOut();
    router.replace('/');
  };

  return (
    <View style={styles.container}>
      {email && <Text style={styles.info}>{email}</Text>}
      {token && (
        <View style={styles.qrContainer}>
          <IconSymbol size={200} name="qrcode" color="black" />
          <Text selectable style={styles.code}>{token}</Text>
        </View>
      )}
      <Button title="Sign Out" onPress={handleSignOut} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16 },
  info: { marginBottom: 24 },
  qrContainer: { alignItems: 'center', marginBottom: 24 },
  code: { marginTop: 8, fontSize: 12, textAlign: 'center' },
});
