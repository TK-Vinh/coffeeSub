import React, { useEffect, useState } from 'react';
import { ActivityIndicator, SectionList, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { CoffeeItemCard } from '@/components/CoffeeItemCard';
import { CoffeeItem, CoffeeItemService } from '@/services/coffee/CoffeeItemService';
import { CategoryService } from '@/services/coffee/CategoryService';

type Section = {
  title: string;
  data: CoffeeItem[];
};

export default function Home() {
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);

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
        setSections(grouped);
      })
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
    <SectionList
      contentContainerStyle={styles.container}
      sections={sections}
      keyExtractor={(item) => item.coffeeId.toString()}
      renderItem={({ item }) => <CoffeeItemCard item={item} />}
      renderSectionHeader={({ section: { title } }) => (
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          {title}
        </ThemedText>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  sectionTitle: { marginTop: 16, marginBottom: 8 },
});
