import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

import Header from '../ui/Header';

export default function TasksHeader() {
  return (
    <Header style={styles.headerContainer}>
      <View style={styles.textWelcomeContainer}>
        <Text variant="headlineSmall" numberOfLines={1} lineBreakMode="tail">
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
  textWelcomeContainer: {
    flex: 3,
  },
});
