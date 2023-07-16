import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import { shallow } from 'zustand/shallow';

import Text from '@components/ui/Text';

import { useStore } from '@store/useStore';

import RecentTasks from './RecentTasks';

import type { HomeNavigationProp } from 'types/types';

export default function Tasks() {
  const navigation = useNavigation<HomeNavigationProp>();
  const { tasks, tasksStatus, tasksError } = useStore(
    (state) => ({
      tasks: state.tasks,
      tasksStatus: state.tasksStatus,
      tasksError: state.tasksError,
    }),
    shallow
  );

  const showAllTaskHandler = () => {
    navigation.navigate('Tasks', { snackbarShow: false });
  };

  return (
    <View style={styles.TasksContainer}>
      <View style={styles.titleContainer}>
        <Text variant="headlineSmall" fontType="regular">
          Recent Task
        </Text>
      </View>
      <RecentTasks tasks={tasks} isLoading={tasksStatus === 'pending'} error={tasksError?.error} />
      {tasks?.length > 0 && (
        <View style={styles.buttonContainer}>
          <Button
            mode="text"
            onPress={showAllTaskHandler}
            style={styles.button}
            labelStyle={{ fontSize: 16 }}
          >
            View all
          </Button>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  TasksContainer: {
    marginHorizontal: 16,
  },
  titleContainer: {
    marginVertical: 16,
    marginHorizontal: 8,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: '50%',
  },
});
