import { GestureResponderEvent, StyleSheet, View } from 'react-native';
import { Button, useTheme } from 'react-native-paper';

interface ITasksFilterProps {
  onPressInprogress: (e?: GestureResponderEvent) => void;
  onPressCompleted: (e?: GestureResponderEvent) => void;
  isCompletedView: boolean;
}

export default function TasksFilter({
  onPressCompleted,
  onPressInprogress,
  isCompletedView,
}: ITasksFilterProps) {
  const theme = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.inverseOnSurface }]}>
      <Button
        mode={isCompletedView ? 'outlined' : 'contained-tonal'}
        style={styles.button}
        onPress={onPressInprogress}
      >
        In Progress
      </Button>
      <Button
        mode={isCompletedView ? 'contained' : 'outlined'}
        style={styles.button}
        onPress={onPressCompleted}
      >
        Completed
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    marginHorizontal: 16,
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    marginHorizontal: 4,
  },
});
