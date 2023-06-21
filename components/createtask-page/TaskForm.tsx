import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { Button, TextInput } from 'react-native-paper';

import Text from '../ui/Text';
import { addTask } from '../../api/api';
import useInputState from '../../hooks/useInputState';
import { CreateTaskNavigationProp } from '../../types/types';

export default function TaskForm() {
  const { input, onChangeInputHandler, setInput } = useInputState<{
    title: string;
    description: string;
    date: Date;
  }>({ inputState: { title: '', description: '', date: new Date() } });
  const [open, setOpen] = useState(false);

  const navigation = useNavigation<CreateTaskNavigationProp>();

  const submitTaskHandler = async () => {
    if (!input.title || !input.description) {
      return;
    }

    const newTask = {
      title: input.title,
      description: input.description,
      date: input.date.toISOString(),
    };

    try {
      await addTask(newTask);
      navigation.goBack();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    } finally {
      setInput({ title: '', description: '', date: new Date() });
    }
  };

  return (
    <>
      <TextInput
        mode="outlined"
        label="Task Name"
        onChangeText={onChangeInputHandler.bind(null, 'title')}
        value={input.title}
      />
      <TextInput
        mode="outlined"
        label="Task Description"
        numberOfLines={4}
        multiline
        onChangeText={onChangeInputHandler.bind(null, 'description')}
        value={input.description}
      />
      <TextInput
        mode="outlined"
        onPressIn={() => setOpen(true)}
        label="Date"
        value={input.date.toLocaleString()}
      />
      <DatePicker
        modal
        title="Select task deadline"
        open={open}
        date={input.date}
        mode="datetime"
        onConfirm={(date) => {
          setOpen(false);
          setInput((prevState) => ({ ...prevState, date }));
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
      <Button mode="contained" style={styles.button} onPress={submitTaskHandler}>
        <Text fontType="semibold" variant="titleMedium">
          Add Task
        </Text>
      </Button>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
});
