
import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/hooks/useAuth';

export default function Welcome() {
  const router = useRouter();
  const { signOut } = useAuth();

  const handleGuest = async () => {
    await signOut();
    router.replace('/(tabs)');
  };

  return (
    <View className="flex-1 justify-center p-4 bg-coffee-light">
      <Pressable
        className="mb-3 rounded bg-coffee-dark py-3"
        onPress={() => router.replace('/sign-in')}
      >
        <Text className="text-center text-white font-semibold">Sign In</Text>
      </Pressable>
      <Pressable
        className="mb-3 rounded border-2 border-coffee-dark py-3"
        onPress={() => router.replace('/sign-up')}
      >
        <Text className="text-center text-coffee-dark font-semibold">Sign Up</Text>
      </Pressable>
      <Pressable onPress={handleGuest} className="mt-4">
        <Text className="text-center text-coffee-dark underline">Try as guest</Text>
      </Pressable>
    </View>
  );
}

