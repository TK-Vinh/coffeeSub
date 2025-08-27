import React from 'react';
import { View, Image, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import type { CoffeeItem } from '@/services/coffee/CoffeeItemService';

interface Props {
  item: CoffeeItem;
}

export function CoffeeItemCard({ item }: Props) {
  const router = useRouter();
  const handlePress = () => router.push(`/coffee/${item.coffeeId}`);

  return (
    <Pressable
      onPress={handlePress}
      className="w-48 mr-4 mb-4 rounded-lg overflow-hidden bg-coffee-light"
    >
      {item.imageUrl ? (
        <Image source={{ uri: item.imageUrl }} className="h-40 w-full" />
      ) : null}
      <View className="p-2">
        <Text className="text-lg font-semibold text-coffee-dark" numberOfLines={2}>
          {item.coffeeName}
        </Text>
        <Text className="text-sm text-coffee-dark/80" numberOfLines={2}>
          {item.description}
        </Text>
      </View>
      <View className="p-2">
        <View className="rounded bg-coffee-dark py-1">
          <Text className="text-center text-white">Use Ticket</Text>
        </View>
      </View>
    </Pressable>
  );
}

