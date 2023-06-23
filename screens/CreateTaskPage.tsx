import { StyleSheet, View } from 'react-native';

import TaskForm from '../components/createtask-page/TaskForm';

export default function CreateTaskPage() {
  return (
    <View style={styles.container}>
      <TaskForm />
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
