import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { ActivityIndicator, List, Text } from 'react-native-paper';
import { ThemedView } from '@/components/ThemedView';
import { CoffeeItemCard } from '@/components/CoffeeItemCard';
import { CoffeeItem, CoffeeItemService } from '@/services/coffee/CoffeeItemService';
import { CategoryService } from '@/services/coffee/CategoryService';
import { AuthFacade } from '@/facades/AuthFacade';
import { useAuth } from '@/hooks/useAuth';

type Category = {
  title: string;
  data: CoffeeItem[];
};

export default function Home() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [remaining, setRemaining] = useState<number | null>(null);
  const { token } = useAuth();

  useEffect(() => {
    const itemSvc = new CoffeeItemService();
    const categorySvc = new CategoryService();
    Promise.all([categorySvc.getAll(), itemSvc.getAll()])
      .then(([cats, items]) => {
        const catArray = Array.isArray(cats) ? cats : cats.data;
        const itemArray = Array.isArray(items) ? items : items.data;
        const grouped = catArray.map((c) => ({
          title: c.categoryName,
          data: itemArray.filter((i) => i.categoryId === c.categoryId),
        }));
        setCategories(grouped);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

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

  return (
    <FlatList
      contentContainerStyle={styles.container}
      data={categories}
      ListHeaderComponent={
        <Text style={styles.remaining}>
          Remaining Tickets: {remaining ?? '—'}
        </Text>
      }
      keyExtractor={(item) => item.title}
      renderItem={({ item }) => (
        <View style={styles.category}>
          <List.Subheader style={styles.sectionTitle}>{item.title}</List.Subheader>
          <FlatList
            data={item.data}
            horizontal
            keyExtractor={(c) => c.coffeeId.toString()}
            renderItem={({ item: coffee }) => <CoffeeItemCard item={coffee} />}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  remaining: { marginBottom: 16, fontWeight: 'bold' },
  sectionTitle: { marginBottom: 8 },
  category: { marginBottom: 24 },
});
