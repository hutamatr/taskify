import { StyleSheet, View } from 'react-native';
import { shallow } from 'zustand/shallow';

import TaskItem from '../../tasks-page/TasksItem';
import Loading from '../../ui/Loading';
import Text from '../../ui/Text';
import { useStore } from '../../../store/useStore';

export default function RecentTasks() {
  const { tasks, isLoading, error } = useStore(
    (state) => ({
      tasks: state.tasks,
      isLoading: state.isLoading,
      error: state.error,
    }),
    shallow
  );

  return (
    <View style={styles.listContainer}>
      {isLoading && <Loading size="large" />}
      {error?.isError && (
        <Text fontType="medium" style={styles.error} variant="headlineSmall">
          {error.errorMessage}
        </Text>
      )}
      {!isLoading && !error.isError && (
        <>
          {tasks.slice(0, 3).map((item) => {
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
    padding: 8,
    margin: 24,
    borderRadius: 8,
    backgroundColor: '#cfcf',
  },
  taskEmptyText: {
    fontSize: 20,
    textAlign: 'center',
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
