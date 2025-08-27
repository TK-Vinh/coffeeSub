import React, { useState } from 'react';
import { FlatList, View } from 'react-native';
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
    <ThemedView className="flex-1 bg-coffee-light p-4" useSafeArea>
      <Searchbar
        placeholder="Search drinks"
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={handleSearch}
        onIconPress={handleSearch}
        className="mb-3"
      />
      <View className="flex-row mb-4">
        {FILTERS.map((f) => (
          <Chip
            key={f}
            className="mr-2"
            selected={selected === f}
            onPress={() => setSelected(f)}
          >
            {f}
          </Chip>
        ))}
      </View>
      {loading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator />
        </View>
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item) => item.coffeeId.toString()}
          renderItem={({ item }) => <CoffeeItemCard item={item} />}
          ListEmptyComponent={
            <View className="flex-1 items-center justify-center">
              <Text>No results</Text>
            </View>
          }
          contentContainerClassName={results.length ? 'pb-4' : 'flex-1'}
        />
      )}
    </ThemedView>
  );
}

