import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-paper';

import { SubscriptionFacade } from '@/facades/SubscriptionFacade';
import { Plan } from '@/factories/PlanFactory';

const facade = new SubscriptionFacade();

export default function Subscriptions() {
  const [plans, setPlans] = useState<Plan[]>([]);

  useEffect(() => {
    facade.getPlans().then(setPlans).catch(console.error);
  }, []);

  return (
    <FlatList
      contentContainerStyle={styles.container}
      data={plans}
      keyExtractor={(item) => item.planId.toString()}
      renderItem={({ item }) => (
        <Card style={styles.card}>
          <Card.Title title={item.planName} />
          <Card.Content>
            <Text>{item.description}</Text>
            <Text style={styles.price}>{`${item.price}₫`}</Text>
          </Card.Content>
        </Card>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  card: { marginBottom: 12 },
  price: { marginTop: 8, fontWeight: 'bold' },
});
