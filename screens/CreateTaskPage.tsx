import { StyleSheet, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

import Text from '../components/ui/Text';
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
      <Button mode="contained" style={styles.button}>
        <Text fontType="semibold" variant="titleMedium">
          Add Task
        </Text>
      </Button>
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
  button: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
});
