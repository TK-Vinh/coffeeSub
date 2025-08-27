import React, { useEffect, useState } from 'react';
import { FlatList, Pressable, Text } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { useRouter } from 'expo-router';

import { SubscriptionFacade } from '@/facades/SubscriptionFacade';
import { Plan } from '@/factories/PlanFactory';

const facade = new SubscriptionFacade();

export default function Subscriptions() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const router = useRouter();

  useEffect(() => {
    facade.getPlans().then(setPlans).catch(console.error);
  }, []);

  return (
    <ThemedView className="flex-1 bg-coffee-light" useSafeArea>
      <FlatList
        contentContainerClassName="p-4"
        data={plans}
        keyExtractor={(item) => item.planId.toString()}
        renderItem={({ item }) => (
          <Pressable
            className="mb-3 rounded-lg bg-white p-4"
            onPress={() => router.push(`/plan/${item.planId}`)}
          >
            <Text className="text-lg font-semibold text-coffee-dark">{item.planName}</Text>
            <Text className="text-coffee-dark/80">{item.description}</Text>
            <Text className="mt-2 font-bold text-coffee-dark">{`${item.price}₫`}</Text>
          </Pressable>
        )}
      />
    </ThemedView>
  );
}

