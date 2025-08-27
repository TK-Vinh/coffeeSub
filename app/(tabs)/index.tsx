import { CoffeeItemCard } from '@/components/CoffeeItemCard';
import { ThemedView } from '@/components/ThemedView';
import { AuthFacade } from '@/facades/AuthFacade';
import { useAuth } from '@/hooks/useAuth';
import { CategoryService } from '@/services/coffee/CategoryService';
import { CoffeeItem, CoffeeItemService } from '@/services/coffee/CoffeeItemService';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { ActivityIndicator, List, Text } from 'react-native-paper';

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
      <ThemedView style={styles.center} useSafeArea>
        <ActivityIndicator />
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.screen} useSafeArea>
      <Text style={styles.remaining}>Remaining Tickets: {remaining ?? '—'}</Text>
      <FlatList
        contentContainerStyle={styles.list}
        data={categories}
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
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  list: { paddingHorizontal: 16, paddingBottom: 16 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  remaining: { marginHorizontal: 16, marginBottom: 16, fontWeight: 'bold' },
  sectionTitle: { marginBottom: 8 },
  category: { marginBottom: 24 },
});
