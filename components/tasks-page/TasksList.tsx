import {
  FlatList,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
  StyleSheet,
  View,
} from 'react-native';
import { shallow } from 'zustand/shallow';

import TaskItem from './TasksItem';
import Loading from '../ui/Loading';
import Text from '../ui/Text';
import { useStore } from '../../store/useStore';
import { type ITask } from '../../types/types';

interface ITaskListProps {
  onScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  tasks: ITask[];
}

export default function TasksList({ onScroll, tasks }: ITaskListProps) {
  const { isLoading, error } = useStore(
    (state) => ({
      isLoading: state.isLoading,
      error: state.error,
      fetchAllTask: state.fetchAllTasksHandler,
    }),
    shallow
  );
  // const { refreshing, refreshHandler } = useRefresh(fetchAllTask);

  return (
    <View style={styles.listContainer}>
      {isLoading && <Loading size="large" />}
      {error?.isError && (
        <Text fontType="medium" style={styles.error} variant="headlineSmall">
          {error.errorMessage}
        </Text>
      )}
      {!isLoading && !error.isError && (
        <FlatList
          data={tasks}
          renderItem={({ item }) => <TaskItem {...item} />}
          keyExtractor={(item) => item.id as string}
          onScroll={onScroll}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
          // refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refreshHandler} />}
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
