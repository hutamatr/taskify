import { useNavigation } from '@react-navigation/native';
import {
  useCollection,
  useCollectionOnce,
} from '@skillnation/react-native-firebase-hooks/firestore';
import { useEffect } from 'react';
import { RefreshControl, ScrollView, StyleSheet, View } from 'react-native';
import { AnimatedFAB } from 'react-native-paper';
import { shallow } from 'zustand/shallow';

import { queryCategories, queryTasks, queryUser } from '../api/api';
import Categories from '../components/home-screen/categories/Categories';
import HomeHeader from '../components/home-screen/HomeHeader';
import TasksSummary from '../components/home-screen/summary/TasksSummary';
import Tasks from '../components/home-screen/tasks/Tasks';
import useFormatData from '../hooks/useFormatData';
import useHandleScroll from '../hooks/useHandleScroll';
import useRefresh from '../hooks/useRefresh';
import { useStore } from '../store/useStore';
import type { HomeNavigationProp, ICategories, ITask, IUser } from '../types/types';

export default function Home() {
  const { handleScroll, showButton } = useHandleScroll();

  const { userInfo, getAllTasks, getAllCategories } = useStore(
    (state) => ({
      userInfo: state.userInfo,
      getAllTasks: state.getAllTasksHandler,
      getAllCategories: state.getAllCategoriesHandler,
    }),
    shallow
  );
  const navigation = useNavigation<HomeNavigationProp>();

  const [user, userLoading, _userError] = useCollectionOnce(queryUser(userInfo?.uid as string));

  const [tasks, taskLoading, taskError, reload] = useCollectionOnce(
    queryTasks(userInfo?.uid as string)
  );
  const [categories, categoriesLoading, categoriesError] = useCollection(
    queryCategories(userInfo?.uid as string)
  );

  const tasksData = useFormatData<ITask[]>(tasks);
  const categoriesData = useFormatData<ICategories[]>(categories);
  const userData = useFormatData<IUser[]>(user);

  useEffect(() => {
    getAllTasks(tasksData, taskLoading, taskError);
    getAllCategories(categoriesData, categoriesLoading, categoriesError);
  }, [
    getAllTasks,
    getAllCategories,
    tasksData,
    taskLoading,
    taskError,
    categoriesData,
    categoriesLoading,
    categoriesError,
  ]);

  const { refreshing, refreshHandler } = useRefresh(reload);

  const createNewTaskHandler = () => {
    navigation.navigate('CreateTask');
  };

  return (
    <View style={styles.container}>
      <ScrollView
        onScroll={handleScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refreshHandler} />}
      >
        <HomeHeader userData={userData[0]} loadingUser={userLoading} />
        <TasksSummary />
        <Categories />
        <Tasks />
      </ScrollView>
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
