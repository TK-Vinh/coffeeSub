import { CoffeeItemCard } from '@/components/CoffeeItemCard';
import { ThemedView } from '@/components/ThemedView';
import { AuthFacade } from '@/facades/AuthFacade';
import { useAuth } from '@/hooks/useAuth';
import { useThemeColor } from '@/hooks/useThemeColor';
import { CategoryService } from '@/services/coffee/CategoryService';
import { CoffeeItem, CoffeeItemService } from '@/services/coffee/CoffeeItemService';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { ActivityIndicator, Appbar, Text, Title } from 'react-native-paper';

type Category = {
  title: string;
  data: CoffeeItem[];
};

export default function Home() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [remaining, setRemaining] = useState<number | null>(null);
  const { token } = useAuth();
  const tint = useThemeColor({}, 'tint');

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
      <Appbar.Header style={styles.appBar}>
        <Appbar.Content title="Coffee Sub" titleStyle={styles.appBarTitle} />
      </Appbar.Header>
      
      <View style={styles.header}>
        <Title style={styles.remainingTitle}>Tickets left:</Title>
        <Text style={[styles.remainingText, { color: tint }]}>{remaining ?? '—'}</Text>
      </View>
      
      <FlatList
        contentContainerStyle={styles.list}
        data={categories}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => (
          <View style={styles.category}>
            <Text variant="titleLarge" style={styles.sectionTitle}>{item.title}</Text>
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
  appBar: {
    backgroundColor: 'transparent',
    elevation: 0,
  },
  appBarTitle: {
    fontWeight: 'bold',
  },
  list: { paddingHorizontal: 16, paddingBottom: 16 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginBottom: 24,
    padding: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  remainingTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  remainingText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: 12,
  },
  category: { marginBottom: 24 },
});