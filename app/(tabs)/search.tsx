import React, { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { ActivityIndicator, Chip, Searchbar, Text } from 'react-native-paper';

import { ThemedView } from '@/components/ThemedView';
import { CoffeeItemCard } from '@/components/CoffeeItemCard';
import { CoffeeItem, CoffeeItemService } from '@/services/coffee/CoffeeItemService';

const FILTERS = ['All', 'Coffee', 'Tea', 'Juice'];

export default function Search() {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState('All');
  const [results, setResults] = useState<CoffeeItem[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const svc = new CoffeeItemService();
      const items = await svc.search(query);
      setResults(items);
    } catch (e) {
      console.error(e);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemedView style={styles.container} useSafeArea>
      <Searchbar
        placeholder="Search drinks"
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={handleSearch}
        onIconPress={handleSearch}
        style={styles.search}
      />
      <View style={styles.filters}>
        {FILTERS.map((f) => (
          <Chip
            key={f}
            style={styles.chip}
            selected={selected === f}
            onPress={() => setSelected(f)}
          >
            {f}
          </Chip>
        ))}
      </View>
      {loading ? (
        <View style={styles.placeholder}>
          <ActivityIndicator />
        </View>
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item) => item.coffeeId.toString()}
          renderItem={({ item }) => <CoffeeItemCard item={item} />}
          ListEmptyComponent={
            <View style={styles.placeholder}>
              <Text>No results</Text>
            </View>
          }
          contentContainerStyle={results.length ? styles.results : undefined}
        />
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  search: { marginBottom: 12 },
  filters: { flexDirection: 'row', marginBottom: 16 },
  chip: { marginRight: 8 },
  placeholder: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  results: { paddingBottom: 16 },
});
