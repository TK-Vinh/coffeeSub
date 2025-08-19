import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { SubscriptionFacade } from '@/facades/SubscriptionFacade';
import { Plan } from '@/factories/PlanFactory';

const facade = new SubscriptionFacade();

export default function Subscriptions() {
  const [plans, setPlans] = useState<Plan[]>([]);

  useEffect(() => {
    facade.getPlans().then(setPlans);
  }, []);

  return (
    <View style={styles.container}>
      {plans.map((plan) => (
        <View key={plan.id} style={styles.plan}>
          <Text>{`${plan.name} - $${plan.price}`}</Text>
          <Button
            title="Buy"
            onPress={() => facade.purchase(plan.id as 'basic' | 'premium', '1')}
          />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  plan: { marginBottom: 12 },
});
