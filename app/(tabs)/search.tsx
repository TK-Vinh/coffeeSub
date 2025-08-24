import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Chip, Searchbar, Text } from 'react-native-paper';

import { ThemedView } from '@/components/ThemedView';

const FILTERS = ['All', 'Coffee', 'Tea', 'Juice'];

export default function Search() {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState('All');

  return (
    <ThemedView style={styles.container}>
      <Searchbar
        placeholder="Search drinks"
        value={query}
        onChangeText={setQuery}
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
      <View style={styles.placeholder}>
        <Text>Search results will appear here.</Text>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  search: { marginBottom: 12 },
  filters: { flexDirection: 'row', marginBottom: 16 },
  chip: { marginRight: 8 },
  placeholder: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
