import { useNavigation, useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Dimensions, FlatList, StyleSheet, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { Button, TextInput } from 'react-native-paper';
import { shallow } from 'zustand/shallow';

import CategoriesItem from '@components/categories-screen/CategoriesItem';
import Loading from '@components/ui/Loading';
import { scheduledLocalNotification } from '@components/ui/Notification';
import Text from '@components/ui/Text';

import { useStore } from '@store/useStore';

import { useAppTheme } from '@hooks/useAppTheme';
import useInputState from '@hooks/useInputState';
import { formatList } from '@utils/formatList';

import type {
  CreateTaskNavigationProp,
  EditTaskNavigationProp,
  EditTaskScreenRouteProp,
  ICategories,
  ITask,
} from 'types/types';

const numColumns = 2;

interface ITaskFormProps {
  categories: ICategories[];
  isLoading: boolean;
  error: Error | undefined;
  isEdit: boolean;
}

export default function TaskForm({ categories, isLoading, error, isEdit }: ITaskFormProps) {
  const [open, setOpen] = useState(false);
  const { input, onChangeInputHandler, setInput } = useInputState<{
    title: string;
    description: string;
    date: Date;
    categoryId: string;
    categoryName: string;
  }>({
    inputState: { title: '', description: '', date: new Date(), categoryId: '', categoryName: '' },
  });

  const theme = useAppTheme();
  const navigation = useNavigation<CreateTaskNavigationProp & EditTaskNavigationProp>();
  const route = useRoute<EditTaskScreenRouteProp>();

  const { addTask, updateTask, tasksStatus, authInfo } = useStore(
    (state) => ({
      addTask: state.addTaskHandler,
      updateTask: state.updateTaskHandler,
      tasksStatus: state.tasksStatus,
      tasksError: state.tasksError,
      authInfo: state.authInfo,
    }),
    shallow
  );

  useEffect(() => {
    if (isEdit) {
      const { title, description, date, categoryId, categoryName } = route.params;
      setInput((prevState) => ({
        ...prevState,
        title: title as string,
        description: description as string,
        date: new Date(date as string),
        categoryId: categoryId as string,
        categoryName: categoryName as string,
      }));
    }
  }, [isEdit, route.params]);

  useEffect(() => {
    if (tasksStatus === 'successful') {
      navigation.navigate('Tasks', {
        snackbarShow: true,
        message: isEdit ? 'Edit task successfully' : 'Create task successfully',
      });
    }
    if (tasksStatus === 'rejected') {
      navigation.navigate('Tasks', {
        snackbarShow: true,
        message: isEdit ? 'Edit task failed' : 'Create task failed',
      });
    }
  }, [tasksStatus, navigation]);

  const pickedCategoriesHandler = ({ name, id }: ICategories) => {
    setInput((prevState) => ({ ...prevState, categoryId: id as string, categoryName: name }));
  };

  const addNewCategoryHandler = () => {
    navigation.navigate('Categories', { snackbarShow: false });
  };

  const submitTaskHandler = async () => {
    if (!input.title || !input.description || !input.date || !input.categoryId) {
      return;
    }

    if (isEdit) {
      const updatedTask: ITask = {
        id: route.params.id,
        title: input.title,
        description: input.description,
        date: input.date.toISOString(),
        categoryId: input.categoryId,
        categoryName: input.categoryName,
      };

      updateTask(updatedTask);
    } else {
      const newTask: ITask = {
        title: input.title,
        description: input.description,
        date: input.date.toISOString(),
        categoryId: input.categoryId,
        categoryName: input.categoryName,
        userId: authInfo?.uid,
      };
      addTask(newTask);

      await scheduledLocalNotification(input.title, input.description, input.date);
    }

    setInput({
      title: '',
      description: '',
      date: new Date(),
      categoryId: '',
      categoryName: '',
    });
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
      <View style={styles.categoriesContainer}>
        <View style={styles.categoriesTitleContainer}>
          <Text fontType="medium" variant="titleLarge">
            Pick Category
          </Text>
          {categories && categories.length > 0 && (
            <Button icon="plus" onPress={addNewCategoryHandler}>
              Add Category
            </Button>
          )}
        </View>
        {isLoading && <Loading size="large" />}
        {error && (
          <Text fontType="medium" style={styles.error} variant="headlineSmall">
            {error.message}
          </Text>
        )}
        {!isLoading && !error && categories?.length === 0 && (
          <View style={styles.categoriesEmptyContainer}>
            <Text fontType="medium" variant="headlineSmall">
              Categories Empty
            </Text>
            <Button icon="plus" onPress={addNewCategoryHandler} mode="elevated">
              Add Category
            </Button>
          </View>
        )}
        {!isLoading && !error && categories && categories.length > 0 && (
          <FlatList
            data={formatList(categories, numColumns)}
            renderItem={({ item }) => {
              if (!item.id) {
                return (
                  <CategoriesItem
                    style={[styles.categoriesItem, { backgroundColor: 'transparent' }]}
                    mode={undefined}
                    name=""
                  />
                );
              }
              return (
                <CategoriesItem
                  {...item}
                  mode={item.id === input.categoryId ? 'contained' : 'outlined'}
                  style={styles.categoriesItem}
                  textStyle={{
                    color:
                      item.id === input.categoryId ? theme.colors.surface : theme.colors.primary,
                  }}
                  textVariant="bodyLarge"
                  onPress={pickedCategoriesHandler.bind(null, item)}
                />
              );
            }}
            keyExtractor={({ id }) => id as string}
            contentContainerStyle={styles.container}
            columnWrapperStyle={styles.row}
            numColumns={numColumns}
          />
        )}
      </View>
      <Button
        mode="contained"
        style={styles.button}
        onPress={submitTaskHandler}
        loading={tasksStatus === 'pending'}
      >
        <Text fontType="semibold" variant="titleMedium" style={{ color: theme.colors.surface }}>
          {isEdit ? 'Update Task' : '  Add Task'}
        </Text>
      </Button>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  categoriesContainer: {
    flex: 1,
    marginBottom: 64,
  },
  categoriesTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 8,
    marginBottom: 16,
  },
  categoriesEmptyContainer: {
    margin: 34,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#cfcf',
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    margin: 4,
  },
  button: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  categoriesItem: {
    marginHorizontal: 4,
    height: Dimensions.get('window').width / 6,
  },
  error: {
    textAlign: 'center',
    margin: 24,
    color: 'red',
  },
});
