import { View, ScrollView, StyleSheet } from 'react-native';
import { AnimatedFAB } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import Header from '../components/home-page/HomeHeader';
import TasksSummary from '../components/home-page/summary/TasksSummary';
import Categories from '../components/home-page/categories/Categories';
import Tasks from '../components/home-page/tasks/Tasks';
import useHandleScroll from '../hooks/useHandleScroll';

import { HomeNavigationProp } from '../types/types';

export default function HomePage() {
  const { handleScroll, showButton } = useHandleScroll();

  const navigate = useNavigation<HomeNavigationProp>();

  const createNewTaskHandler = () => {
    navigate.navigate('CreateTask');
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
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
