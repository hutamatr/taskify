import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { AnimatedFAB } from 'react-native-paper';
import { shallow } from 'zustand/shallow';

import TaskFilter from '../components/tasks-page/TasksFilter';
import TasksHeader from '../components/tasks-page/TasksHeader';
import TaskList from '../components/tasks-page/TasksList';
import useHandleScroll from '../hooks/useHandleScroll';
import { useStore } from '../store/useStore';
import { type TasksNavigationProp } from '../types/types';

export default function AllTaskPage() {
  const { handleScroll, showButton } = useHandleScroll();
  const navigation = useNavigation<TasksNavigationProp>();
  const [isCompletedView, setIsCompletedView] = useState(false);

  const { fetchInProgress, fetchCompleted, inProgressTasks, completedTasks } = useStore(
    (state) => ({
      fetchInProgress: state.fetchAllInProgress,
      fetchCompleted: state.fetchAllCompleted,
      inProgressTasks: state.inProgressTasks,
      completedTasks: state.completedTasks,
    }),
    shallow
  );

  useEffect(() => {
    fetchInProgress();
  }, []);

  const createNewTaskHandler = () => {
    navigation.navigate('CreateTask');
  };

  const inProgressFilterHandler = () => {
    fetchInProgress();
    setIsCompletedView(false);
  };

  const completedFilterHandler = () => {
    fetchCompleted();
    setIsCompletedView(true);
  };

  return (
    <View style={styles.container}>
      <TasksHeader />
      <TaskFilter
        onPressCompleted={completedFilterHandler}
        onPressInprogress={inProgressFilterHandler}
        isCompletedView={isCompletedView}
      />
      <TaskList
        onScroll={handleScroll}
        tasks={isCompletedView ? completedTasks : inProgressTasks}
      />
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
