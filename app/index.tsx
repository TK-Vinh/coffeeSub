
import React from 'react';
import { StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from 'react-native-paper';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';

export default function Welcome() {
  const router = useRouter();

  const tint = useThemeColor({}, 'tint');
  return (
    <ThemedView style={styles.container} useSafeArea>
      <Button mode="contained" onPress={() => router.push('/sign-in')} style={styles.button}>
        Sign In
      </Button>
      <Button mode="outlined" onPress={() => router.push('/sign-up')} style={styles.button}>
        Sign Up
      </Button>
      <Pressable onPress={() => router.replace('/(tabs)')} style={styles.guest}>
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
