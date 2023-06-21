import { StyleSheet, View } from 'react-native';

import TaskItem from '../../tasks-page/TasksItem';
import Text from '../../ui/Text';
import { useStore } from '../../../store/useStore';

export default function RecentTasks() {
  const tasks = useStore((state) => state.tasks);

  return (
    <View style={styles.listContainer}>
      {tasks?.length === 0 ? (
        <View style={styles.taskEmptyContainer}>
          <Text variant="headlineSmall" fontType="medium">
            No Task
          </Text>
        </View>
      ) : (
        <>
          {tasks?.slice(0, 5).map((item) => {
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
});
