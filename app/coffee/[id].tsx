import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet } from 'react-native';
import { ActivityIndicator, Button, Modal, Portal, Text } from 'react-native-paper';
import QRCode from 'react-native-qrcode-svg';

import { ThemedView } from '@/components/ThemedView';
import { AuthFacade } from '@/facades/AuthFacade';
import { useAuth } from '@/hooks/useAuth';
import { useThemeColor } from '@/hooks/useThemeColor';
import { CoffeeItem, CoffeeItemService } from '@/services/coffee/CoffeeItemService';

export default function CoffeeDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [item, setItem] = useState<CoffeeItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [remaining, setRemaining] = useState<number | null>(null);
  const [qrValue, setQrValue] = useState<string | null>(null);
  const [qrVisible, setQrVisible] = useState(false);
  const { token, userId } = useAuth();
  const secondary = useThemeColor({}, 'icon');

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
      const payload = JSON.stringify({
        subscriptionId: res.subscriptionId,
        coffeeCode: res.coffeeCode,
        userId: res.userId,
      });
      setQrValue(payload);
      setQrVisible(true);
    } catch (e) {
      console.error(e);
    }
  };

  if (loading) {
    return (
      <ThemedView style={styles.center} useSafeArea>
        <ActivityIndicator />
      </ThemedView>
    );
  }

  if (!item) {
    return (
      <ThemedView style={styles.center} useSafeArea>
        <Text>No coffee found</Text>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={{ flex: 1 }} useSafeArea>
      <ScrollView contentContainerStyle={styles.container}>
        {item.imageUrl ? <Image source={{ uri: item.imageUrl }} style={styles.image} /> : null}
        <Text variant="headlineSmall" style={styles.title}>
          {item.coffeeName}
        </Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.remaining}>Tickets left: {remaining ?? '—'}</Text>
        <Button
          mode="contained"
          icon="ticket-outline"
          style={styles.button}
          onPress={handleUseTicket}
        >
          Use Ticket
        </Button>
      </ScrollView>
      <Portal>
        <Modal
          visible={qrVisible}
          onDismiss={() => setQrVisible(false)}
          contentContainerStyle={styles.modal}
        >
          {qrValue ? <QRCode value={qrValue} size={200} /> : null}
          <Button onPress={() => setQrVisible(false)} style={styles.closeButton}>
            Close
          </Button>
        </Modal>
      </Portal>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  image: { width: '100%', height: 200, marginBottom: 16 },
  title: { marginBottom: 8 },
  description: { marginBottom: 8 },
  code: { marginBottom: 16 },
  remaining: { marginBottom: 8, fontWeight: 'bold' },
  button: { marginTop: 8 },
  modal: {
    backgroundColor: 'white',
    padding: 24,
    alignItems: 'center',
  },
  closeButton: { marginTop: 16 },
});

