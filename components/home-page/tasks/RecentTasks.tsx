import { StyleSheet, View } from 'react-native';

import TaskItem from '../../tasks-page/TasksItem';
import Text from '../../ui/Text';
import { DUMMY_DATA } from '../../../utils/dummy';

export default function RecentTasks() {
  return (
    <View style={styles.listContainer}>
      {DUMMY_DATA.length === 0 ? (
        <View style={styles.taskEmptyContainer}>
          <Text variant="headlineSmall" fontType="medium">
            No Task
          </Text>
        </View>
      ) : (
        <>
          {DUMMY_DATA.slice(0, 5).map((item) => {
            return (
              <TaskItem
                key={item.id}
                description={item.description}
                isCompleted={item.isCompleted}
                createdAt={item.createdAt}
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
