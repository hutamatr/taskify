import {
  FlatList,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
  StyleSheet,
  View,
} from 'react-native';

import TaskItem from './TasksItem';
import { DUMMY_DATA } from '../../utils/dummy';

interface ITaskListProps {
  onScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
}

export default function TasksList({ onScroll }: ITaskListProps) {
  return (
    <View style={styles.listContainer}>
      <FlatList
        data={DUMMY_DATA}
        renderItem={({ item }) => (
          <TaskItem description={item.description} createdAt={item.createdAt} />
        )}
        keyExtractor={(item) => item.id as string}
        onScroll={onScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    marginHorizontal: 16,
    marginBottom: 150,
  },
});
