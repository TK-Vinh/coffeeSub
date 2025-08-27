import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, Pressable, ScrollView, Text } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

import { ThemedView } from '@/components/ThemedView';
import { CoffeeItem, CoffeeItemService } from '@/services/coffee/CoffeeItemService';
import { AuthFacade } from '@/facades/AuthFacade';
import { useAuth } from '@/hooks/useAuth';
import { useThemeColor } from '@/hooks/useThemeColor';

export default function CoffeeDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [item, setItem] = useState<CoffeeItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [remaining, setRemaining] = useState<number | null>(null);
  const { token, userId } = useAuth();
  const secondary = useThemeColor({}, 'icon');
  const router = useRouter();

  useEffect(() => {
    if (!id) return;
    const svc = new CoffeeItemService();
    svc
      .get(Number(id))
      .then(setItem)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (!token) {
      setRemaining(null);
      return;
    }
    const facade = new AuthFacade();
    facade
      .currentUser(token)
      .then((u) => setRemaining(u.userSubscriptions.remainingCups))
      .catch(console.error);
  }, [token]);

  const handleUseTicket = async () => {
    if (!token || !userId || !id) return;
    const svc = new CoffeeItemService();
    try {
      const res = await svc.generateQrCode(userId, Number(id), token);
      router.push({
        pathname: '/ticket',
        params: {
          subscriptionId: String(res.subscriptionId),
          coffeeCode: res.coffeeCode,
          userId: String(res.userId),
        },
      });
    } catch (e) {
      console.error(e);
    }
  };

  if (loading) {
    return (
      <ThemedView className="flex-1 items-center justify-center bg-coffee-light" useSafeArea>
        <ActivityIndicator />
      </ThemedView>
    );
  }

  if (!item) {
    return (
      <ThemedView className="flex-1 items-center justify-center bg-coffee-light" useSafeArea>
        <Text>No coffee found</Text>
      </ThemedView>
    );
  }

  return (
    <ThemedView className="flex-1 bg-coffee-light" useSafeArea>
      <ScrollView className="flex-1" contentContainerClassName="p-4">
        {item.imageUrl ? (
          <Image source={{ uri: item.imageUrl }} className="mb-4 h-52 w-full rounded" />
        ) : null}
        <Text className="mb-2 text-2xl font-bold text-coffee-dark">{item.coffeeName}</Text>
        <Text className="mb-2 text-coffee-dark/80">{item.description}</Text>
        <Text className="mb-4" style={{ color: secondary }}>
          Code: {item.code}
        </Text>
        <Text className="mb-4 font-semibold text-coffee-dark">
          Tickets left: {remaining ?? '—'}
        </Text>
        <Pressable
          className="rounded bg-coffee-dark py-3"
          onPress={handleUseTicket}
        >
          <Text className="text-center font-semibold text-white">Use Ticket</Text>
        </Pressable>
      </ScrollView>
    </ThemedView>
  );
}


