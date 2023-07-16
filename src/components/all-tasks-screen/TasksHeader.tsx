import { StyleSheet, View } from 'react-native';

import Header from '@components/ui/Header';
import Text from '@components/ui/Text';

export default function TasksHeader() {
  return (
    <Header style={styles.headerContainer}>
      <View style={styles.textTasksContainer}>
        <Text variant="headlineSmall" numberOfLines={1} lineBreakMode="tail" fontType="regular">
          Tasks
        </Text>
      </View>
    </Header>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    paddingTop: 8,
  },
  textTasksContainer: {
    flex: 3,
  },
});
