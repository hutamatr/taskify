import React from 'react';
import { StyleSheet, View } from 'react-native';

import TasksItem from '@components/all-tasks-screen/TasksItem';
import Loading from '@components/ui/Loading';
import Text from '@components/ui/Text';

import type { ITask } from 'types/types';

interface IRecentTasksProps {
  tasks: ITask[];
  isLoading: boolean;
  error: Error | undefined;
}

export default function RecentTasks({ tasks, isLoading, error }: IRecentTasksProps) {
  return (
    <View style={styles.listContainer}>
      {isLoading && <Loading size="large" />}
      {error && (
        <Text fontType="medium" style={styles.error} variant="headlineSmall">
          {error.message}
        </Text>
      )}
      {tasks?.length === 0 && (
        <View style={styles.taskEmptyContainer}>
          <Text fontType="medium" variant="headlineSmall">
            Task Empty
          </Text>
        </View>
      )}
      {!isLoading && !error && tasks && tasks.length > 0 && (
        <>
          {tasks
            .filter((item) => !item.isCompleted)
            .slice(0, 3)
            .map((item) => {
              return (
                <TasksItem
                  key={item.id}
                  id={item.id}
                  categoryId={item.categoryId}
                  categoryName={item.categoryName}
                  title={item.title}
                  date={item.date}
                  description={item.description}
                  isCompleted={item.isCompleted}
                />
              );
            })}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  taskEmptyContainer: {
    padding: 12,
    margin: 34,
    borderRadius: 8,
    backgroundColor: '#cfcf',
  },
  loading: {
    textAlign: 'center',
    margin: 24,
  },
  error: {
    textAlign: 'center',
    margin: 24,
    color: 'red',
  },
});
