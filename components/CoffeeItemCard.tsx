import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-paper';
import type { CoffeeItem } from '@/services/coffee/CoffeeItemService';

interface Props {
  item: CoffeeItem;
}

export function CoffeeItemCard({ item }: Props) {
  return (
    <Card style={styles.card}>
      {item.imageUrl ? <Card.Cover source={{ uri: item.imageUrl }} style={styles.cover} /> : null}
      <Card.Content>
        <Text variant="titleMedium" style={styles.title}>
          {item.coffeeName}
        </Text>
        <Text variant="bodyMedium">{item.description}</Text>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
  },
  cover: {
    height: 160,
  },
  title: {
    marginBottom: 4,
  },
});
