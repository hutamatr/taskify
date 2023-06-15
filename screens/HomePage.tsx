import {
  View,
  ScrollView,
  StyleSheet,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { AnimatedFAB } from 'react-native-paper';

import Header from '../components/Dashboard/Header';
import TaskSummary from '../components/Dashboard/Summary/TaskSummary';
import Project from '../components/Dashboard/Category/Category';
import DashboardTasks from '../components/Dashboard/Tasks/DashboardTasks';
import { useState } from 'react';

export default function HomePage() {
  const [isExtended, setIsExtended] = useState(true);

  const onScroll = ({ nativeEvent }: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentScrollPosition = Math.floor(nativeEvent?.contentOffset?.y) ?? 0;
    setIsExtended(currentScrollPosition <= 0);
  };

  const fabStyle = { right: 16 };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container} onScroll={onScroll}>
        <Header />
        <TaskSummary />
        <Project />
        <DashboardTasks />
      </ScrollView>
      <AnimatedFAB
        icon="plus"
        label="Add Task"
        extended={isExtended}
        onPress={() => console.log('Pressed')}
        visible={true}
        animateFrom="right"
        iconMode="dynamic"
        style={[styles.fab, fabStyle]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fab: {
    bottom: 16,
    right: 16,
    position: 'absolute',
  },
});
