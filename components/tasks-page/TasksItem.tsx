import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-paper';

interface ITaskItemProps {
  description: string;
  createdAt: string;
  isCompleted?: boolean;
}

export default function TasksItem({ description, createdAt }: ITaskItemProps) {
  return (
    <Card style={styles.itemContainer} mode="contained" contentStyle={styles.itemContainer}>
      <Card.Content style={styles.cardContentContainer}>
        <Text variant="titleLarge">{description}</Text>
        <Text variant="bodyLarge">{new Date(createdAt).toLocaleString()}</Text>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    display: 'flex',
    width: '100%',
    marginBottom: 16,
    padding: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  cardContentContainer: {
    flex: 2,
    rowGap: 24,
  },
});
