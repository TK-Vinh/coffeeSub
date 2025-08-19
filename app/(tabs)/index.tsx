import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { CoffeeItemCard } from '@/components/CoffeeItemCard';
import { CoffeeItem, CoffeeItemService } from '@/services/coffee/CoffeeItemService';

export default function Home() {
  const [items, setItems] = useState<CoffeeItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const svc = new CoffeeItemService();
    svc
      .getAll()
      .then(setItems)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <ThemedView style={styles.center}>
        <ActivityIndicator />
      </ThemedView>
    );
  }

  return (
    <FlatList
      contentContainerStyle={styles.container}
      data={items}
      keyExtractor={(item) => item.coffeeId.toString()}
      renderItem={({ item }) => <CoffeeItemCard item={item} />}
    />
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
