import { useCollection } from '@skillnation/react-native-firebase-hooks/firestore';
import { StyleSheet, View } from 'react-native';
import { useTheme } from 'react-native-paper';

import SummaryCard from './SummaryCard';
import Loading from '../../ui/Loading';
import Text from '../../ui/Text';
import { queryTasks } from '../../../api/api';
import useFormatData from '../../../hooks/useFormatData';
import { useStore } from '../../../store/useStore';
import { ITask } from '../../../types/types';

export default function TasksSummary() {
  const theme = useTheme();

  const userInfo = useStore((state) => state.userInfo);

  const [tasks, loading, error] = useCollection(queryTasks(userInfo?.uid as string));

  const tasksData = useFormatData<ITask[]>(tasks);

  return (
    <View style={styles.summaryContainer}>
      <View style={styles.TextContainer}>
        <Text variant="displayMedium" numberOfLines={2} lineBreakMode="tail" fontType="medium">
          your have
        </Text>
        {loading && <Loading size="large" />}
        {!loading && (
          <Text
            variant="displayLarge"
            numberOfLines={2}
            lineBreakMode="tail"
            fontType="semibold"
            style={{ color: theme.colors.primary }}
          >
            {tasksData.length > 99 ? '99+' : tasksData.length.toString()}
          </Text>
        )}

        <Text variant="displayMedium" numberOfLines={2} lineBreakMode="tail" fontType="medium">
          tasks today
        </Text>
      </View>
      <SummaryCard tasks={tasksData} isLoading={loading} error={error} />
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
