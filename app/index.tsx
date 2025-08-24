
import React from 'react';
import { StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from 'react-native-paper';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useAuth } from '@/hooks/useAuth';

export default function Welcome() {
  const router = useRouter();
  const { signOut } = useAuth();

  const tint = useThemeColor({}, 'tint');

  const handleGuest = async () => {
    await signOut();
    router.replace('/(tabs)');
  };

  return (
    <ThemedView style={styles.container} useSafeArea>
      <Button mode="contained" onPress={() => router.replace('/sign-in')} style={styles.button}>
        Sign In
      </Button>
      <Button mode="outlined" onPress={() => router.replace('/sign-up')} style={styles.button}>
        Sign Up
      </Button>
      <Pressable onPress={handleGuest} style={styles.guest}>
        <ThemedText style={[styles.guestText, { color: tint }]}>Try as guest</ThemedText>
      </Pressable>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 16, gap: 12 },
  button: { marginVertical: 4 },
  guest: { marginTop: 16 },
  guestText: { textAlign: 'center' },
});
