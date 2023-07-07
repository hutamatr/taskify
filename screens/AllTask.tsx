import { useNavigation, useRoute } from '@react-navigation/native';
import { useCollection } from '@skillnation/react-native-firebase-hooks/firestore';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { AnimatedFAB, Snackbar } from 'react-native-paper';

import { queryTasksCompleted, queryTasksInProgress } from '../api/api';
import TasksFilter from '../components/all-tasks-screen/TasksFilter';
import TasksHeader from '../components/all-tasks-screen/TasksHeader';
import TasksList from '../components/all-tasks-screen/TasksList';
import useFormatData from '../hooks/useFormatData';
import useHandleScroll from '../hooks/useHandleScroll';
import { useStore } from '../store/useStore';
import type { ITask, TasksNavigationProp, TasksScreenRouteProp } from '../types/types';

export default function AllTask() {
  const [visible, setVisible] = useState(false);
  const [isCompletedView, setIsCompletedView] = useState(false);

  const { handleScroll, showButton } = useHandleScroll();
  const navigation = useNavigation<TasksNavigationProp>();
  const route = useRoute<TasksScreenRouteProp>();
  const userInfo = useStore((state) => state.userInfo);

  const [tasksCompleted, completedIsLoading, completedError] = useCollection(
    queryTasksCompleted(userInfo?.uid as string)
  );
  const [tasksInProgress, progressIsLoading, progressError] = useCollection(
    queryTasksInProgress(userInfo?.uid as string)
  );

  const tasksCompletedData = useFormatData<ITask[]>(tasksCompleted);
  const tasksInProgressData = useFormatData<ITask[]>(tasksInProgress);

  useEffect(() => {
    if (route.params?.snackbarShow) {
      setVisible(route.params.snackbarShow);
    }
  }, [route.params]);

  const onDismissSnackBar = () => setVisible(false);

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
