import { useNavigation, useRoute } from '@react-navigation/native';
import { useEffect, useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { AnimatedFAB, Snackbar } from 'react-native-paper';
import { shallow } from 'zustand/shallow';

import TasksFilter from '@components/all-tasks-screen/TasksFilter';
import TasksHeader from '@components/all-tasks-screen/TasksHeader';
import TasksList from '@components/all-tasks-screen/TasksList';

import { useStore } from '@store/useStore';

import useHandleScroll from '@hooks/useHandleScroll';
import useSnackbar from '@hooks/useSnackbar';

import type { TasksNavigationProp, TasksScreenRouteProp } from 'types/types';

export default function AllTask() {
  const [isCompletedView, setIsCompletedView] = useState(false);

  const { handleScroll, showButton } = useHandleScroll();
  const { visible, setVisible, onDismissSnackBar } = useSnackbar();
  const navigation = useNavigation<TasksNavigationProp>();
  const route = useRoute<TasksScreenRouteProp>();
  const { tasks, tasksStatus, tasksError, setTasksStatus } = useStore(
    (state) => ({
      tasks: state.tasks,
      tasksStatus: state.tasksStatus,
      tasksError: state.tasksError,
      setTasksStatus: state.setTasksStatusHandler,
    }),
    shallow
  );

  // const [tasksCompleted, completedIsLoading, completedError] = useCollection(
  //   queryTasksCompleted(authInfo?.uid as string)
  // );
  // const [tasksInProgress, progressIsLoading, progressError] = useCollection(
  //   queryTasksInProgress(authInfo?.uid as string)
  // );

  // const tasksCompletedData = useFormatData<ITask[]>(tasksCompleted);
  // const tasksInProgressData = useFormatData<ITask[]>(tasksInProgress);

  const tasksCompletedSort = useMemo(() => {
    const taskSorted = tasks
      .filter((task) => task.isCompleted)
      .sort((a, b) => +new Date(b.date as string) - +new Date(a.date as string));
    return taskSorted;
  }, [tasks]);

  const tasksInProgressSort = useMemo(() => {
    const taskSorted = tasks
      .filter((task) => !task.isCompleted)
      .sort((a, b) => +new Date(b.date as string) - +new Date(a.date as string));
    return taskSorted;
  }, [tasks]);

  useEffect(() => {
    if (route.params?.snackbarShow) {
      setVisible(route.params.snackbarShow);
    }
  }, [route.params]);

  const createNewTaskHandler = () => {
    navigation.navigate('CreateTask');
    setTasksStatus('idle');
  };

  const inProgressFilterHandler = () => {
    setIsCompletedView(false);
  };

  const completedFilterHandler = () => {
    setIsCompletedView(true);
  };

  const onDismissSnackBarHandler = () => {
    onDismissSnackBar();
    setTasksStatus('idle');
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
        isLoading={tasksStatus === 'pending'}
        error={tasksError?.error}
        style={{ marginBottom: 150 }}
      />
      <AnimatedFAB
        icon="plus"
        variant="surface"
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
        onDismiss={onDismissSnackBarHandler}
        duration={5000}
        action={{
          label: 'Ok',
          onPress: () => {
            onDismissSnackBarHandler();
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
