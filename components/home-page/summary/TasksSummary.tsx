import { StyleSheet, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { shallow } from 'zustand/shallow';

import SummaryCard from './SummaryCard';
import Loading from '../../ui/Loading';
import Text from '../../ui/Text';
import { useStore } from '../../../store/useStore';

export default function TasksSummary() {
  const theme = useTheme();
  const { tasks, isLoading } = useStore(
    (state) => ({
      tasks: state.tasks,
      isLoading: state.isLoading,
    }),
    shallow
  );

  return (
    <View style={styles.summaryContainer}>
      <View style={styles.TextContainer}>
        <Text variant="displayMedium" numberOfLines={2} lineBreakMode="tail" fontType="medium">
          your have
        </Text>
        {isLoading && <Loading size="large" />}
        {!isLoading && (
          <Text
            variant="displayLarge"
            numberOfLines={2}
            lineBreakMode="tail"
            fontType="semibold"
            style={{ color: theme.colors.primary }}
          >
            {tasks.length > 99 ? '99+' : tasks.length.toString()}
          </Text>
        )}

        <Text variant="displayMedium" numberOfLines={2} lineBreakMode="tail" fontType="medium">
          tasks today
        </Text>
      </View>
      <SummaryCard />
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
