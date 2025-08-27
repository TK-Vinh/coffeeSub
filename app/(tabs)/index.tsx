import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
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
      <ThemedView className="flex-1 items-center justify-center bg-coffee-light" useSafeArea>
        <ActivityIndicator />
      </ThemedView>
    );
  }

  return (
    <ThemedView className="flex-1 bg-coffee-light" useSafeArea>
      <Text className="mx-4 mb-4 font-bold text-coffee-dark">
        Remaining Tickets: {remaining ?? '—'}
      </Text>
      <FlatList
        contentContainerClassName="px-4 pb-4"
        data={categories}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => (
          <View className="mb-6">
            <Text className="mb-2 text-lg font-semibold text-coffee-dark">{item.title}</Text>
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

