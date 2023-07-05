import { useNavigation } from '@react-navigation/native';
import { useCollectionOnce } from '@skillnation/react-native-firebase-hooks/firestore';
import { RefreshControl, ScrollView, StyleSheet, View } from 'react-native';
import { AnimatedFAB } from 'react-native-paper';

import { tasksColRef } from '../api/api';
import Categories from '../components/home-page/categories/Categories';
import Header from '../components/home-page/HomeHeader';
import TasksSummary from '../components/home-page/summary/TasksSummary';
import Tasks from '../components/home-page/tasks/Tasks';
import useHandleScroll from '../hooks/useHandleScroll';
import useRefresh from '../hooks/useRefresh';
import type { HomeNavigationProp } from '../types/types';

export default function HomePage() {
  const { handleScroll, showButton } = useHandleScroll();

  const navigation = useNavigation<HomeNavigationProp>();

  const [_tasks, _tasksLoading, _tasksError, reload] = useCollectionOnce(tasksColRef);

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
        <Header />
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
