import { StyleSheet, View } from 'react-native';

import TaskItem from '../../all-tasks-screen/TasksItem';
import Loading from '../../ui/Loading';
import Text from '../../ui/Text';
import { ITask } from '../../../types/types';

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
            .slice(0, 3)
            .filter((item) => !item.isCompleted)
            .map((item) => {
              return (
                <TaskItem
                  key={item.id}
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
