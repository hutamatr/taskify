import { View, StyleSheet } from 'react-native';
import { AnimatedFAB } from 'react-native-paper';

import TasksHeader from '../components/tasks-page/TasksHeader';
import TaskFilter from '../components/tasks-page/TasksFilter';
import TaskList from '../components/tasks-page/TasksList';
import useHandleScroll from '../hooks/useHandleScroll';

export default function AllTaskPage() {
  const { handleScroll, showButton } = useHandleScroll();

  return (
    <View style={styles.container}>
      <TasksHeader />
      <TaskFilter />
      <TaskList onScroll={handleScroll} />
      <AnimatedFAB
        icon="plus"
        variant="tertiary"
        label="Add Task"
        extended={showButton}
        onPress={() => console.log('Pressed')}
        visible={true}
        animateFrom="right"
        iconMode="dynamic"
        style={styles.fab}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fab: {
    position: 'absolute',
    bottom: 16,
    right: 16,
  },
});
