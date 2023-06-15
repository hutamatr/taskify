import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-paper';

export default function CategoryCard() {
  return (
    <Card style={styles.cardContainer} mode="contained">
      <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
      <Card.Content style={styles.cardContent}>
        <Text variant="titleMedium">Expenses Mobile App</Text>
        <Text variant="bodySmall">Card content</Text>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
  },
  cardContent: {
    padding: 8,
  },
});
