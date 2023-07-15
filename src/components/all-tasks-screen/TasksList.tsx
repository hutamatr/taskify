import {
  FlatList,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

import Loading from '@components/ui/Loading';
import Text from '@components/ui/Text';

import TasksItem from './TasksItem';

import type { ITask } from 'types/types';

interface ITaskListProps {
  onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  tasks: ITask[];
  isLoading: boolean;
  error: Error | undefined;
  style?: StyleProp<ViewStyle>;
}

export default function TasksList({ onScroll, tasks, isLoading, error, style }: ITaskListProps) {
  return (
    <View style={[styles.listContainer, style]}>
      {isLoading && <Loading size="large" />}
      {error && (
        <Text fontType="medium" style={styles.error} variant="headlineSmall">
          Failed view tasks list!
        </Text>
      )}
      {!isLoading && !error && tasks.length === 0 && (
        <View style={styles.taskEmptyContainer}>
          <Text fontType="medium" variant="headlineSmall">
            Task Empty
          </Text>
        </View>
      )}
      {!isLoading && !error && tasks.length > 0 && (
        <FlatList
          data={tasks}
          renderItem={({ item }) => <TasksItem {...item} />}
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  taskEmptyContainer: {
    margin: 34,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#cfcf',
  },
  loading: {
    textAlign: 'center',
    margin: 24,
  },
  error: {
    textAlign: 'center',
    margin: 24,
    color: 'red',
  },
});
