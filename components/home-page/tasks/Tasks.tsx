import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';

import RecentTasks from './RecentTasks';
import Text from '../../ui/Text';
import { type HomeNavigationProp } from '../../../types/types';

export default function Tasks() {
  const navigation = useNavigation<HomeNavigationProp>();

  const showAllTaskHandler = () => {
    navigation.navigate('Tasks');
  };

  return (
    <View style={styles.TasksContainer}>
      <View style={styles.titleContainer}>
        <Text variant="headlineSmall" fontType="regular">
          Recent Task
        </Text>
        <Button mode="text" onPress={showAllTaskHandler}>
          See all
        </Button>
      </View>
      <RecentTasks />
    </View>
  );
}

const styles = StyleSheet.create({
  TasksContainer: {
    marginHorizontal: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 8,
    marginBottom: 16,
  },
});
