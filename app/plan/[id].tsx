import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { ActivityIndicator, Button, Card, Text } from 'react-native-paper';
import { useLocalSearchParams } from 'expo-router';
import { WebView } from 'react-native-webview';

import { ThemedView } from '@/components/ThemedView';
import { Plan } from '@/factories/PlanFactory';
import { SubscriptionFacade } from '@/facades/SubscriptionFacade';
import { AuthFacade } from '@/facades/AuthFacade';
import { useAuth } from '@/hooks/useAuth';

const facade = new SubscriptionFacade();
const authFacade = new AuthFacade();

export default function PlanDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [plan, setPlan] = useState<Plan | null>(null);
  const [loading, setLoading] = useState(true);
  const [paymentUrl, setPaymentUrl] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const { token } = useAuth();

  useEffect(() => {
    if (!id) return;
    facade
      .getPlan(Number(id))
      .then(setPlan)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <ThemedView style={styles.center}>
        <ActivityIndicator />
      </ThemedView>
    );
  }

  if (!plan) {
    return (
      <ThemedView style={styles.center}>
        <Text>No plan found</Text>
      </ThemedView>
    );
  }

  if (paymentUrl) {
    return (
      <ThemedView style={styles.container}>
        <WebView source={{ uri: paymentUrl }} style={{ flex: 1 }} />
      </ThemedView>
    );
  }

  const handleSubscribe = async () => {
    if (!token) return;
    try {
      setSubmitting(true);
      const user = await authFacade.currentUser(token);
      const url = await facade.createPaymentUrl(Number(id), user.id);
      setPaymentUrl(url);
    } catch (e) {
      console.error(e);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <Card>
        <Card.Title title={plan.planName} />
        <Card.Content>
          <Text>{plan.description}</Text>
          <Text style={styles.price}>{`${plan.price}₫`}</Text>
          <Text>Duration: {plan.durationDays} days</Text>
          <Text>Total cups: {plan.totalCups}</Text>
          <Text>Daily limit: {plan.dailyCupLimit}</Text>
        </Card.Content>
        <Card.Actions>
          <Button mode="contained" onPress={handleSubscribe} loading={submitting} disabled={submitting}>
            Đăng ký
          </Button>
        </Card.Actions>
      </Card>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  price: { marginVertical: 8, fontWeight: 'bold' },
});
