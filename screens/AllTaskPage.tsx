import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { AnimatedFAB } from 'react-native-paper';
import { shallow } from 'zustand/shallow';

import TasksFilter from '../components/tasks-page/TasksFilter';
import TasksHeader from '../components/tasks-page/TasksHeader';
import TasksList from '../components/tasks-page/TasksList';
import useHandleScroll from '../hooks/useHandleScroll';
import { useStore } from '../store/useStore';
import type { TasksNavigationProp } from '../types/types';

export default function AllTaskPage() {
  const { handleScroll, showButton } = useHandleScroll();
  const navigation = useNavigation<TasksNavigationProp>();
  const [isCompletedView, setIsCompletedView] = useState(false);

  const { fetchInProgress, fetchCompleted, inProgressTasks, completedTasks, userInfo } = useStore(
    (state) => ({
      fetchInProgress: state.fetchAllInProgressHandler,
      fetchCompleted: state.fetchAllCompletedHandler,
      inProgressTasks: state.inProgressTasks,
      completedTasks: state.completedTasks,
      userInfo: state.userInfo,
    }),
    shallow
  );

  useEffect(() => {
    if (userInfo) {
      fetchInProgress(userInfo.uid);
    }
  }, []);

  const createNewTaskHandler = () => {
    navigation.navigate('CreateTask');
  };

  const inProgressFilterHandler = () => {
    fetchInProgress(userInfo?.uid as string);
    setIsCompletedView(false);
  };

  const completedFilterHandler = () => {
    fetchCompleted(userInfo?.uid as string);
    setIsCompletedView(true);
  };

  return (
    <View style={styles.container}>
      <TasksHeader />
      <TasksFilter
        onPressCompleted={completedFilterHandler}
        onPressInprogress={inProgressFilterHandler}
        isCompletedView={isCompletedView}
      />
      <TasksList
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
