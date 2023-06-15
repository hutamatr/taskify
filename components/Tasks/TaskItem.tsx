import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Card, Text } from 'react-native-paper';

import { ITask } from '../../types/types';

const windowWidth = Dimensions.get('window').width;

export default function TaskItem({ author, description, isCompleted }: ITask) {
  return (
    <Card style={styles.itemContainer} mode="contained">
      <Card.Content>
        <Text variant="titleMedium">{description}</Text>
        <Text variant="bodyMedium">{author}</Text>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
  },
  itemDescription: {
    flex: 2,
    rowGap: 8,
  },
  taskStatus: {
    flex: 1,
    backgroundColor: '#cfcf',
    padding: 6,
    borderRadius: 6,
  },
  textDescription: {
    fontSize: 16,
  },
  textAuthor: {
    fontSize: 12,
  },
  textStatus: {
    fontSize: windowWidth > 360 ? 10.5 : 9.5,
  },
});
