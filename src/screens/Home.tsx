import { useNavigation } from '@react-navigation/native';
import { useCollection } from '@skillnation/react-native-firebase-hooks/firestore';
import { useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { AnimatedFAB } from 'react-native-paper';
import { shallow } from 'zustand/shallow';

import Categories from '@components/home-screen/categories/Categories';
import HomeHeader from '@components/home-screen/HomeHeader';
import TasksSummary from '@components/home-screen/summary/TasksSummary';
import Tasks from '@components/home-screen/tasks/Tasks';

import { useStore } from '@store/useStore';
import { queryCategories, queryTasks, queryUser } from '@api/api';

import useFormatData from '@hooks/useFormatData';
import useHandleScroll from '@hooks/useHandleScroll';

import type { HomeNavigationProp, ICategories, ITask, IUser } from 'types/types';

export default function Home() {
  const { handleScroll, showButton } = useHandleScroll();
  const navigation = useNavigation<HomeNavigationProp>();

  const { authInfo, getAllTasks, getAllCategories, retrieveUser } = useStore(
    (state) => ({
      authInfo: state.authInfo,
      getAllTasks: state.getAllTasksHandler,
      getAllCategories: state.getAllCategoriesHandler,
      retrieveUser: state.retrieveUserProfileHandler,
    }),
    shallow
  );

  const [user, userLoading, _userError] = useCollection(queryUser(authInfo?.uid as string));
  const [tasks, taskLoading, taskError] = useCollection(queryTasks(authInfo?.uid as string));
  const [categories, categoriesLoading, categoriesError] = useCollection(
    queryCategories(authInfo?.uid as string)
  );

  const userData = useFormatData<IUser[]>(user)[0];
  const tasksData = useFormatData<ITask[]>(tasks);
  const categoriesData = useFormatData<ICategories[]>(categories);

  useEffect(() => {
    retrieveUser(userData);
    getAllTasks(tasksData, taskLoading, taskError);
    getAllCategories(categoriesData, categoriesLoading, categoriesError);
  }, [
    retrieveUser,
    getAllTasks,
    getAllCategories,
    tasksData,
    taskLoading,
    taskError,
    categoriesData,
    categoriesLoading,
    categoriesError,
    userData,
  ]);

  const createNewTaskHandler = () => {
    navigation.navigate('CreateTask');
  };

  return (
    <View style={styles.container}>
      <ScrollView
        onScroll={handleScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        <HomeHeader userData={userData} loadingUser={userLoading} />
        <TasksSummary />
        <Categories />
        <Tasks />
      </ScrollView>
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
