import React from 'react';
import { StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';

import Text from '../ui/Text';

interface ITaskItemProps {
  title: string;
  description: string;
  date: string;
  isCompleted?: boolean;
}

export default function TasksItem({ title, description, date }: ITaskItemProps) {
  return (
    <Card style={styles.itemContainer} mode="contained" contentStyle={styles.itemContainer}>
      <Card.Content style={styles.cardContentContainer}>
        <Text variant="titleLarge" fontType="medium">
          {title}
        </Text>
        <Text variant="bodySmall" fontType="regular">
          {description}
        </Text>
        <Text variant="bodyLarge" fontType="regular">
          {new Date(date).toLocaleString()}
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
