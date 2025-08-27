import type { CoffeeItem } from '@/services/coffee/CoffeeItemService';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';

interface Props {
  item: CoffeeItem;
}

export function CoffeeItemCard({ item }: Props) {
  const router = useRouter();
  const handlePress = () => router.push(`/coffee/${item.coffeeId}`);

  return (
    <Card style={styles.card} onPress={handlePress}>
      {item.imageUrl ? <Card.Cover source={{ uri: item.imageUrl }} style={styles.cover} /> : null}
      <Card.Content>
        <Text
          variant="titleMedium"
          style={styles.title}
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {item.coffeeName}
        </Text>
        <Text
          variant="bodyMedium"
          numberOfLines={2}
          ellipsizeMode="tail"
          style={styles.description}
        >
          {item.description}
        </Text>
      </Card.Content>
      <Card.Actions>
        <Button
          icon="ticket-outline"
          mode="contained"
          compact
          onPress={handlePress}
        >
          Use Ticket
        </Button>
      </Card.Actions>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 200,
    marginRight: 16,
    marginBottom: 16,
  },
  cover: {
    height: 160,
  },
  title: {
    marginBottom: 4,
  },
  description: {
    minHeight: 40,
  },
});
