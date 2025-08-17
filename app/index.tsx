import React from 'react';
import { View, Button, StyleSheet, Pressable, Text } from 'react-native';
import { useRouter } from 'expo-router';

export default function Welcome() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Button title="Sign In" onPress={() => router.push('/sign-in')} />
      <Button title="Sign Up" onPress={() => router.push('/sign-up')} />
      <Pressable onPress={() => router.replace('/(tabs)')} style={styles.guest}>
        <Text style={styles.guestText}>Try as guest</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 16, gap: 12 },
  guest: { marginTop: 16 },
  guestText: { color: '#007aff', textAlign: 'center' },
});
