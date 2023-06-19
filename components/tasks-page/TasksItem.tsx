import React from 'react';
import { StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';

import Text from '../ui/Text';

interface ITaskItemProps {
  description: string;
  createdAt: string;
  isCompleted?: boolean;
}

export default function TasksItem({ description, createdAt }: ITaskItemProps) {
  return (
    <Card style={styles.itemContainer} mode="contained" contentStyle={styles.itemContainer}>
      <Card.Content style={styles.cardContentContainer}>
        <Text variant="titleLarge" fontType="medium">
          {description}
        </Text>
        <Text variant="bodyLarge" fontType="regular">
          {new Date(createdAt).toLocaleString()}
        </Text>
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
