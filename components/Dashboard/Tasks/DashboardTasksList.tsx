import React from 'react';
import { Text } from 'react-native-paper';
import { SafeAreaView, StyleSheet, View } from 'react-native';

import { DUMMY_DATA } from '../../../utils/dummy';
import TaskItem from '../../Tasks/TaskItem';

export default function DashboardTasksList() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.listContainer}>
        {DUMMY_DATA.length === 0 ? (
          <View style={styles.taskEmptyContainer}>
            <Text variant="headlineSmall">No Task</Text>
          </View>
        ) : (
          <>
            {DUMMY_DATA.slice(0, 5).map((item) => {
              return (
                <TaskItem
                  key={item.id}
                  author={item.author}
                  description={item.description}
                  isCompleted={item.isCompleted}
                />
              );
            })}
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  listContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  taskEmptyContainer: {
    padding: 8,
    margin: 24,
    borderRadius: 8,
    backgroundColor: '#cfcf',
  },
  taskEmptyText: {
    fontSize: 20,
    textAlign: 'center',
  },
});
