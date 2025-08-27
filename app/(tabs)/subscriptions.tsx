import { ThemedView } from '@/components/ThemedView';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { ActivityIndicator, Appbar, Card, Text } from 'react-native-paper';

import { SubscriptionFacade } from '@/facades/SubscriptionFacade';
import { Plan } from '@/factories/PlanFactory';
import { useThemeColor } from '@/hooks/useThemeColor';

const facade = new SubscriptionFacade();

export default function Subscriptions() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const cardColor = useThemeColor({}, 'card');
  const tint = useThemeColor({}, 'tint');

  useEffect(() => {
    facade.getPlans()
      .then(setPlans)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <ThemedView style={styles.center} useSafeArea>
        <ActivityIndicator />
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.screen} useSafeArea>
      <Appbar.Header style={styles.appBar}>
        <Appbar.Content title="Subscription Plans" titleStyle={styles.appBarTitle} />
      </Appbar.Header>
      <FlatList
        contentContainerStyle={styles.container}
        data={plans}
        keyExtractor={(item) => item.planId.toString()}
        renderItem={({ item }) => (
          <Card
            style={[styles.card, { backgroundColor: cardColor }]}
            onPress={() => router.push(`/plan/${item.planId}`)}
          >
            <View style={styles.cardHeader}>
              <MaterialCommunityIcons name="ticket-confirmation-outline" size={30} color={tint} />
              <Card.Title
                title={item.planName}
                titleStyle={styles.cardTitle}
                subtitle={`${item.price}₫`}
                subtitleStyle={styles.cardSubtitle}
              />
            </View>
            <Card.Content>
              <Text style={styles.description}>{item.description}</Text>
            </Card.Content>
          </Card>
        )}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  appBar: {
    backgroundColor: 'transparent',
    elevation: 0,
  },
  appBarTitle: {
    fontWeight: 'bold',
  },
  container: { padding: 16 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  card: {
    marginBottom: 16,
    borderRadius: 12,
    elevation: 4, // subtle shadow
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 12,
  },
  cardSubtitle: {
    fontSize: 16,
    color: 'gray',
    marginLeft: 12,
  },
  description: {
    lineHeight: 22,
  },
});