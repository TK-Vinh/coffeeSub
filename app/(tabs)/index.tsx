import React from 'react';
import { FlatList, Text, View, StyleSheet } from 'react-native';
import { DRINKS } from '@/constants/drinks';

export default function Home() {
  return (
    <FlatList
      contentContainerStyle={styles.container}
      data={DRINKS}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Text>{item.name}</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  item: { paddingVertical: 12, borderBottomWidth: 1, borderColor: '#ccc' },
});
