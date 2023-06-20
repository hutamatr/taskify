import { StyleSheet, View } from 'react-native';

import Header from '../ui/Header';
import Text from '../ui/Text';

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
