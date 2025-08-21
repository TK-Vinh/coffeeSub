import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { ActivityIndicator, Card, Text } from 'react-native-paper';
import { useLocalSearchParams } from 'expo-router';

import { ThemedView } from '@/components/ThemedView';
import { CoffeeItem, CoffeeItemService } from '@/services/coffee/CoffeeItemService';

export default function CoffeeDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [item, setItem] = useState<CoffeeItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const svc = new CoffeeItemService();
    svc
      .get(Number(id))
      .then(setItem)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

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
    <ThemedView style={styles.container}>
      <Card>
        {item.imageUrl ? <Card.Cover source={{ uri: item.imageUrl }} /> : null}
        <Card.Title title={item.coffeeName} />
        <Card.Content>
          <Text>{item.description}</Text>
          <Text>Code: {item.code}</Text>
        </Card.Content>
      </Card>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

