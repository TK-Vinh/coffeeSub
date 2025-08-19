import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { DRINKS } from '@/constants/drinks';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';

export default function Home() {
  const borderColor = useThemeColor({}, 'icon');
  return (
    <FlatList
      contentContainerStyle={styles.container}
      data={DRINKS}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ThemedView style={[styles.item, { borderColor }]}>
          <ThemedText>{item.name}</ThemedText>
        </ThemedView>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  item: { paddingVertical: 12, borderBottomWidth: 1 },
});
