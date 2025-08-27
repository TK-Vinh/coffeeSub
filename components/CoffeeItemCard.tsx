import { useThemeColor } from '@/hooks/useThemeColor';
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
  const cardColor = useThemeColor({}, 'card');

  return (
    <Card style={[styles.card, { backgroundColor: cardColor }]} onPress={handlePress}>
      {item.imageUrl ? <Card.Cover source={{ uri: item.imageUrl }} style={styles.cover} /> : null}
      <Card.Content style={styles.content}>
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
      <Card.Actions style={styles.actions}>
        <Button
          icon="ticket-outline"
          mode="contained"
          compact
          onPress={handlePress}
          labelStyle={styles.buttonLabel}
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
    borderRadius: 12,
    elevation: 4, // Add a subtle shadow
  },
  cover: {
    height: 120,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  content: {
    paddingTop: 12,
    paddingBottom: 0,
  },
  title: {
    marginBottom: 4,
    fontWeight: 'bold',
  },
  description: {
    minHeight: 40,
    color: 'gray', // Make description text a bit lighter
  },
  actions: {
    padding: 12,
    justifyContent: 'flex-end',
  },
  buttonLabel: {
    fontSize: 12,
  },
});