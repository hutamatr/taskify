import { StyleSheet, View } from 'react-native';
import { Button, useTheme } from 'react-native-paper';

export default function TasksFilter() {
  const theme = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.inverseOnSurface }]}>
      <Button mode="contained" style={styles.button}>
        Completed
      </Button>
      <Button mode="outlined" style={styles.button}>
        In Progress
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
