import React from 'react';
import { Pressable, Text } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import QRCode from 'react-native-qrcode-svg';

import { ThemedView } from '@/components/ThemedView';

export default function TicketScreen() {
  const { subscriptionId, coffeeCode, userId } = useLocalSearchParams<{
    subscriptionId: string;
    coffeeCode: string;
    userId: string;
  }>();
  const router = useRouter();
  const payload = JSON.stringify({
    subscriptionId: Number(subscriptionId),
    coffeeCode,
    userId: Number(userId),
  });

  return (
    <ThemedView className="flex-1 items-center justify-center bg-coffee-light p-6" useSafeArea>
      <QRCode value={payload} size={200} />
      <Pressable
        onPress={() => router.back()}
        className="mt-6 rounded bg-coffee-dark px-6 py-3"
      >
        <Text className="font-semibold text-white">Close</Text>
      </Pressable>
    </ThemedView>
  );
}
