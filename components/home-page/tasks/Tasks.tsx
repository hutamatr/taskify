import { useNavigation } from '@react-navigation/native';
import { useCollection } from '@skillnation/react-native-firebase-hooks/firestore';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';

import RecentTasks from './RecentTasks';
import Text from '../../ui/Text';
import { queryTasks } from '../../../api/api';
import useFormatData from '../../../hooks/useFormatData';
import { useStore } from '../../../store/useStore';
import type { HomeNavigationProp, ITask } from '../../../types/types';

export default function Tasks() {
  const navigation = useNavigation<HomeNavigationProp>();
  const userInfo = useStore((state) => state.userInfo);

  const [tasks, loading, error] = useCollection(queryTasks(userInfo?.uid as string));

  const tasksData = useFormatData<ITask[]>(tasks);

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
      <RecentTasks tasks={tasksData} isLoading={loading} error={error} />
      {tasksData.length > 0 && (
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
