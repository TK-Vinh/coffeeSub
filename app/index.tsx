
import React from 'react';
import { Button, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';

export default function Welcome() {
  const router = useRouter();

  const tint = useThemeColor({}, 'tint');
  return (
    <ThemedView style={styles.container} useSafeArea>
      <Button title="Sign In" onPress={() => router.push('/sign-in')} />
      <Button title="Sign Up" onPress={() => router.push('/sign-up')} />
      <Pressable onPress={() => router.replace('/(tabs)')} style={styles.guest}>
        <ThemedText style={[styles.guestText, { color: tint }]}>Try as guest</ThemedText>
      </Pressable>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 16, gap: 12 },
  guest: { marginTop: 16 },
  guestText: { textAlign: 'center' },
});
