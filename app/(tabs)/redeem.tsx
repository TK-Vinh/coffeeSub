import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { RedemptionFacade } from '@/facades/RedemptionFacade';

const facade = new RedemptionFacade();

export default function Redeem() {
  const [code, setCode] = useState('');

  const handleRedeem = async () => {
    await facade.redeem(code);
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter code"
        value={code}
        onChangeText={setCode}
        style={styles.input}
      />
      <Button title="Redeem" onPress={handleRedeem} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 16 },
  input: { borderWidth: 1, borderColor: '#ccc', marginBottom: 12, padding: 8 },
});
