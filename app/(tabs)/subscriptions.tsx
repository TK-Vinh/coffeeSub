
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet } from 'react-native';
import { SubscriptionFacade } from '@/facades/SubscriptionFacade';
import { Plan } from '@/factories/PlanFactory';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

const facade = new SubscriptionFacade();

export default function Subscriptions() {
  const [plans, setPlans] = useState<Plan[]>([]);

  useEffect(() => {
    facade.getPlans().then(setPlans);
  }, []);

  return (
    <ThemedView style={styles.container}>
      {plans.map((plan) => (
        <ThemedView key={plan.id} style={styles.plan}>
          <ThemedText>{`${plan.name} - $${plan.price}`}</ThemedText>
          <Button
            title="Buy"
            onPress={() => facade.purchase(plan.id as 'basic' | 'premium', '1')}
          />
        </ThemedView>
      ))}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  plan: { marginBottom: 12 },
});
