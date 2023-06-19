import { View, StyleSheet } from 'react-native';

import Text from '../ui/Text';
import Header from '../ui/Header';

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
    paddingTop: 16,
  },
  textTasksContainer: {
    flex: 3,
  },
});
