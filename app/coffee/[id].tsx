import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet } from 'react-native';
import { ActivityIndicator, Button, Text } from 'react-native-paper';
import { useLocalSearchParams } from 'expo-router';

import { ThemedView } from '@/components/ThemedView';
import { CoffeeItem, CoffeeItemService } from '@/services/coffee/CoffeeItemService';
import { AuthFacade } from '@/facades/AuthFacade';
import { useAuth } from '@/hooks/useAuth';

export default function CoffeeDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [item, setItem] = useState<CoffeeItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [remaining, setRemaining] = useState<number | null>(null);
  const { token } = useAuth();

  useEffect(() => {
    if (!id) return;
    const svc = new CoffeeItemService();
    svc
      .get(Number(id))
      .then(setItem)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (!token) {
      setRemaining(null);
      return;
    }
    const facade = new AuthFacade();
    facade
      .currentUser(token)
      .then((u) => setRemaining(u.userSubscriptions.remainingCups))
      .catch(console.error);
  }, [token]);

  if (loading) {
    return (
      <ThemedView style={styles.center}>
        <ActivityIndicator />
      </ThemedView>
    );
  }

  if (!item) {
    return (
      <ThemedView style={styles.center}>
        <Text>No coffee found</Text>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        {item.imageUrl ? <Image source={{ uri: item.imageUrl }} style={styles.image} /> : null}
        <Text variant="headlineSmall" style={styles.title}>
          {item.coffeeName}
        </Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.code}>Code: {item.code}</Text>
        <Text style={styles.remaining}>Tickets left: {remaining ?? '—'}</Text>
        <Button
          mode="contained"
          icon="ticket-outline"
          style={styles.button}
        >
          Use Ticket
        </Button>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  image: { width: '100%', height: 200, marginBottom: 16 },
  title: { marginBottom: 8 },
  description: { marginBottom: 8 },
  code: { marginBottom: 16, color: '#666' },
  remaining: { marginBottom: 8, fontWeight: 'bold' },
  button: { marginTop: 8 },
});

