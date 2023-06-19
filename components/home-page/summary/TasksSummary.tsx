import { View, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';

import Text from '../../ui/Text';
import SummaryCard from './SummaryCard';

export default function TasksSummary() {
  const theme = useTheme();

  return (
    <View style={styles.summaryContainer}>
      <View style={styles.TextContainer}>
        <Text variant="displayMedium" numberOfLines={2} lineBreakMode="tail" fontType="medium">
          your have
        </Text>
        <Text
          variant="displayLarge"
          numberOfLines={2}
          lineBreakMode="tail"
          fontType="semibold"
          style={{ color: theme.colors.primary }}
        >
          10
        </Text>
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
});
