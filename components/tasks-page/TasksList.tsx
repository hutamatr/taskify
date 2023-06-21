import {
  FlatList,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
  StyleSheet,
  View,
} from 'react-native';

import TaskItem from './TasksItem';
import Text from '../ui/Text';
import { useStore } from '../../store/useStore';

interface ITaskListProps {
  onScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
}

export default function TasksList({ onScroll }: ITaskListProps) {
  const tasks = useStore((state) => state.tasks);
  const isLoading = useStore((state) => state.isLoading);

  console.log({ tasks });

  return (
    <View style={styles.listContainer}>
      {isLoading ? (
        <Text fontType="medium">Loading...</Text>
      ) : (
        <FlatList
          data={tasks}
          renderItem={({ item }) => <TaskItem {...item} />}
          keyExtractor={(item) => item.id as string}
          onScroll={onScroll}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    marginHorizontal: 16,
    marginBottom: 150,
  },
});
