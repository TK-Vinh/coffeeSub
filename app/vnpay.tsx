import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import { useLocalSearchParams } from 'expo-router';

import { ThemedView } from '@/components/ThemedView';

export default function VnpayScreen() {
  const { url } = useLocalSearchParams<{ url: string }>();

  if (!url) {
    return (
      <ThemedView style={styles.center}>
        <Text>Missing payment URL</Text>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <WebView source={{ uri: url }} style={{ flex: 1 }} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
