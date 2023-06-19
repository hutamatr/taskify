import { View, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

import useInputState from '../hooks/useInputState';

export default function CreateTaskPage() {
  const { input, onChangeInputHandler } = useInputState<{
    title: string;
    description: string;
  }>({ inputState: { title: '', description: '' } });

  return (
    <View style={styles.container}>
      <TextInput
        mode="outlined"
        label="Task Name"
        onChangeText={onChangeInputHandler.bind(null, 'title')}
        value={input.title}
      />
      <TextInput
        mode="outlined"
        label="Task Description"
        onChangeText={onChangeInputHandler.bind(null, 'description')}
        value={input.description}
      />
      <Button mode="contained">Add Task</Button>
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
