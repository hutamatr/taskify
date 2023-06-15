import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import DashboardTasksList from './DashboardTasksList';

import { HomeNavigationProp } from '../../../types/types';

export default function DashboardTasks() {
  const navigation = useNavigation<HomeNavigationProp>();

  const showAllTaskHandler = () => {
    navigation.navigate('AllTasksStack');
  };

  return (
    <View style={styles.dashboardTasksContainer}>
      <View style={styles.titleContainer}>
        <Text variant="headlineSmall">Recent Task</Text>
        <Button mode="text" onPress={showAllTaskHandler}>
          See all
        </Button>
      </View>
      <DashboardTasksList />
    </View>
  );
}

const styles = StyleSheet.create({
  dashboardTasksContainer: {
    marginHorizontal: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 8,
    marginBottom: 16,
  },
});
