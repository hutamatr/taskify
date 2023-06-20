import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';
import { AnimatedFAB } from 'react-native-paper';

import TaskFilter from '../components/tasks-page/TasksFilter';
import TasksHeader from '../components/tasks-page/TasksHeader';
import TaskList from '../components/tasks-page/TasksList';
import useHandleScroll from '../hooks/useHandleScroll';
import { type TasksNavigationProp } from '../types/types';

export default function AllTaskPage() {
  const { handleScroll, showButton } = useHandleScroll();
  const navigation = useNavigation<TasksNavigationProp>();

  const createNewTaskHandler = () => {
    navigation.navigate('CreateTask');
  };

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
        onPress={createNewTaskHandler}
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
