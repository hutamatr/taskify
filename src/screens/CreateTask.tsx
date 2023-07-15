import { StyleSheet, View } from 'react-native';
import { shallow } from 'zustand/shallow';

import TaskForm from '@components/task-form/TaskForm';

import { useStore } from '@store/useStore';

export default function CreateTask() {
  const { categories, categoriesStatus, categoriesError } = useStore(
    (state) => ({
      categories: state.categories,
      categoriesStatus: state.categoriesStatus,
      categoriesError: state.categoriesError,
    }),
    shallow
  );

  // const [categories, loading, error] = useCollectionOnce(queryCategories(authInfo?.uid as string));

  // const categoriesData = useFormatData<ICategories[]>(categories);

  return (
    <View style={styles.container}>
      <TaskForm
        categories={categories}
        isLoading={categoriesStatus === 'pending'}
        error={categoriesError?.error}
        isEdit={false}
      />
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
