import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';

import RecentTasks from './RecentTasks';
import Text from '../../ui/Text';
import { useStore } from '../../../store/useStore';
import type { HomeNavigationProp } from '../../../types/types';

export default function Tasks() {
  const navigation = useNavigation<HomeNavigationProp>();
  const tasks = useStore((state) => state.tasks);

  const showAllTaskHandler = () => {
    navigation.navigate('Tasks');
  };

  return (
    <View style={styles.TasksContainer}>
      <View style={styles.titleContainer}>
        <Text variant="headlineSmall" fontType="regular">
          Recent Task
        </Text>
      </View>
      <RecentTasks />
      {tasks.length > 0 && (
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
