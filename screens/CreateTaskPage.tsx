import { useCollectionOnce } from '@skillnation/react-native-firebase-hooks/firestore';
import { StyleSheet, View } from 'react-native';

import { queryCategories } from '../api/api';
import TaskForm from '../components/createtask-page/TaskForm';
import useFormatData from '../hooks/useFormatData';
import { useStore } from '../store/useStore';
import type { ICategories } from '../types/types';

export default function CreateTaskPage() {
  const userInfo = useStore((state) => state.userInfo);

  const [categories, loading, error] = useCollectionOnce(queryCategories(userInfo?.uid as string));

  const categoriesData = useFormatData<ICategories[]>(categories);

  return (
    <View style={styles.container}>
      <TaskForm categories={categoriesData} isLoading={loading} error={error} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
    marginVertical: 24,
    rowGap: 24,
  },
});
