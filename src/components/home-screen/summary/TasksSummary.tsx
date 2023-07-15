import { StyleSheet, View } from 'react-native';
import { shallow } from 'zustand/shallow';

import Loading from '@components/ui/Loading';
import Text from '@components/ui/Text';

import { useStore } from '@store/useStore';

import { useAppTheme } from '@hooks/useAppTheme';

import SummaryCard from './SummaryCard';

export default function TasksSummary() {
  const theme = useAppTheme();

  const { tasks, tasksStatus, tasksError, categories, categoriesStatus, categoriesError } =
    useStore(
      (state) => ({
        tasks: state.tasks,
        categories: state.categories,
        tasksStatus: state.tasksStatus,
        categoriesStatus: state.categoriesStatus,
        tasksError: state.tasksError,
        categoriesError: state.categoriesError,
      }),
      shallow
    );

  return (
    <View style={styles.summaryContainer}>
      <View style={styles.TextContainer}>
        <Text variant="displayMedium" numberOfLines={2} lineBreakMode="tail" fontType="medium">
          your have
        </Text>
        {tasksStatus === 'pending' && <Loading size="large" />}
        {tasksStatus !== 'pending' && tasksStatus !== 'rejected' && (
          <Text
            variant="displayLarge"
            numberOfLines={1}
            lineBreakMode="tail"
            fontType="semibold"
            style={{ color: theme.colors.primary }}
          >
            {tasks.length > 99 ? '99+' : tasks.length.toString()}
          </Text>
        )}
        <Text variant="displayMedium" numberOfLines={2} lineBreakMode="tail" fontType="medium">
          tasks total
        </Text>
      </View>
      <SummaryCard
        tasks={tasks}
        categories={categories}
        isLoading={tasksStatus === 'pending' || categoriesStatus === 'pending'}
        error={tasksError?.error ?? categoriesError?.error}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  summaryContainer: {
    flex: 1,
    columnGap: 8,
    marginHorizontal: 16,
    marginVertical: 16,
    rowGap: 16,
  },
  TextContainer: {
    alignItems: 'flex-start',
    rowGap: 16,
  },
  loading: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 16,
  },
});
