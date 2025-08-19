import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';
import type { CoffeeItem } from '@/services/coffee/CoffeeItemService';

interface Props {
  item: CoffeeItem;
}

export function CoffeeItemCard({ item }: Props) {
  const borderColor = useThemeColor({}, 'icon');
  const backgroundColor = useThemeColor({}, 'background');
  return (
    <ThemedView style={[styles.card, { borderColor, backgroundColor }]}>
      {item.imageUrl ? (
        <Image source={{ uri: item.imageUrl }} style={styles.image} />
      ) : null}
      <ThemedText type="defaultSemiBold" style={styles.title}>
        {item.coffeeName}
      </ThemedText>
      <ThemedText>{item.description}</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: 160,
    borderRadius: 4,
    marginBottom: 8,
  },
  title: {
    marginBottom: 4,
  },
});

