import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, useTheme } from 'react-native-paper';

import Text from '../ui/Text';

interface ITaskItemProps {
  title: string;
  description: string;
  date: string;
  isCompleted?: boolean;
}

export default function TasksItem({ title, description, date, isCompleted }: ITaskItemProps) {
  const theme = useTheme();

  return (
    <Card
      style={[
        styles.itemContainer,
        { backgroundColor: isCompleted ? theme.colors.primary : theme.colors.inversePrimary },
      ]}
      mode="contained"
      contentStyle={styles.itemContainer}
    >
      <Card.Content style={styles.cardContentContainer}>
        <Text variant="headlineSmall" fontType="medium" numberOfLines={1} lineBreakMode="tail">
          {title}
        </Text>
        <Text variant="bodyLarge" fontType="medium" numberOfLines={2} lineBreakMode="tail">
          {description}
        </Text>
        <Text variant="bodySmall" fontType="regular">
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
