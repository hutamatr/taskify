import { useNavigation } from '@react-navigation/native';
import { useCollection } from '@skillnation/react-native-firebase-hooks/firestore';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { AnimatedFAB } from 'react-native-paper';

import { queryTasksCompleted, queryTasksInProgress } from '../api/api';
import TasksFilter from '../components/tasks-page/TasksFilter';
import TasksHeader from '../components/tasks-page/TasksHeader';
import TasksList from '../components/tasks-page/TasksList';
import useFormatData from '../hooks/useFormatData';
import useHandleScroll from '../hooks/useHandleScroll';
import { useStore } from '../store/useStore';
import type { ITask, TasksNavigationProp } from '../types/types';

export default function AllTaskPage() {
  const { handleScroll, showButton } = useHandleScroll();
  const navigation = useNavigation<TasksNavigationProp>();
  const [isCompletedView, setIsCompletedView] = useState(false);

  const userInfo = useStore((state) => state.userInfo);

  const [tasksCompleted, completedIsLoading, completedError] = useCollection(
    queryTasksCompleted(userInfo?.uid as string)
  );
  const [tasksInProgress, progressIsLoading, progressError] = useCollection(
    queryTasksInProgress(userInfo?.uid as string)
  );

  const tasksCompletedData = useFormatData<ITask[]>(tasksCompleted);
  const tasksInProgressData = useFormatData<ITask[]>(tasksInProgress);

  const createNewTaskHandler = () => {
    navigation.navigate('CreateTask');
  };

  const inProgressFilterHandler = () => {
    setIsCompletedView(false);
  };

  const completedFilterHandler = () => {
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
        tasks={isCompletedView ? tasksCompletedData : tasksInProgressData}
        isLoading={isCompletedView ? completedIsLoading : progressIsLoading}
        error={isCompletedView ? completedError : progressError}
        style={{ marginBottom: 150 }}
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
