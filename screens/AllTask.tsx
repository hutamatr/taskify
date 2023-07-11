import { useNavigation, useRoute } from '@react-navigation/native';
import { useCollection } from '@skillnation/react-native-firebase-hooks/firestore';
import { useEffect, useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { AnimatedFAB, Snackbar } from 'react-native-paper';

import { queryTasksCompleted, queryTasksInProgress } from '../api/api';
import TasksFilter from '../components/all-tasks-screen/TasksFilter';
import TasksHeader from '../components/all-tasks-screen/TasksHeader';
import TasksList from '../components/all-tasks-screen/TasksList';
import useFormatData from '../hooks/useFormatData';
import useHandleScroll from '../hooks/useHandleScroll';
import useSnackbar from '../hooks/useSnackbar';
import { useStore } from '../store/useStore';
import type { ITask, TasksNavigationProp, TasksScreenRouteProp } from '../types/types';

export default function AllTask() {
  const [isCompletedView, setIsCompletedView] = useState(false);

  const { handleScroll, showButton } = useHandleScroll();
  const { visible, setVisible, onDismissSnackBar } = useSnackbar();
  const navigation = useNavigation<TasksNavigationProp>();
  const route = useRoute<TasksScreenRouteProp>();
  const authInfo = useStore((state) => state.authInfo);

  const [tasksCompleted, completedIsLoading, completedError] = useCollection(
    queryTasksCompleted(authInfo?.uid as string)
  );
  const [tasksInProgress, progressIsLoading, progressError] = useCollection(
    queryTasksInProgress(authInfo?.uid as string)
  );

  const tasksCompletedData = useFormatData<ITask[]>(tasksCompleted);
  const tasksInProgressData = useFormatData<ITask[]>(tasksInProgress);

  const tasksCompletedSort = useMemo(() => {
    const taskSorted = [...tasksCompletedData].sort(
      (a, b) => +new Date(b.date as string) - +new Date(a.date as string)
    );
    return taskSorted;
  }, [tasksCompletedData]);

  const tasksInProgressSort = useMemo(() => {
    const taskSorted = [...tasksInProgressData].sort(
      (a, b) => +new Date(b.date as string) - +new Date(a.date as string)
    );
    return taskSorted;
  }, [tasksInProgressData]);

  useEffect(() => {
    if (route.params?.snackbarShow) {
      setVisible(route.params.snackbarShow);
    }
  }, [route.params]);

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
        tasks={isCompletedView ? tasksCompletedSort : tasksInProgressSort}
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
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        duration={5000}
        action={{
          label: 'Ok',
          onPress: () => {
            onDismissSnackBar();
          },
        }}
      >
        {route.params?.message}
      </Snackbar>
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
