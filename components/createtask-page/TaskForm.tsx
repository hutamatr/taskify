import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Dimensions, FlatList, StyleSheet, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { Button, TextInput } from 'react-native-paper';
import { shallow } from 'zustand/shallow';

import CategoriesItem from '../categories-page/CategoriesItem';
import Loading from '../ui/Loading';
import Text from '../ui/Text';
import useInputState from '../../hooks/useInputState';
import { useStore } from '../../store/useStore';
import { CreateTaskNavigationProp, ICategories, ITask } from '../../types/types';
import { formatData } from '../../utils/formatDataList';

const numColumns = 2;

export default function TaskForm() {
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

  const navigation = useNavigation<CreateTaskNavigationProp>();

  const { categories, addTask, fetchAllCategories, isLoading, error } = useStore(
    (state) => ({
      addTask: state.addTaskHandler,
      fetchAllCategories: state.fetchAllCategoriesHandler,
      categories: state.categories,
      isLoading: state.isLoading,
      error: state.error,
    }),
    shallow
  );

  useEffect(() => {
    fetchAllCategories();
  }, []);

  const pickedCategoriesHandler = ({ name, id }: ICategories) => {
    setInput((prevState) => ({ ...prevState, categoryId: id as string, categoryName: name }));
  };

  const addNewCategoryHandler = () => {
    navigation.navigate('Categories');
  };

  const submitTaskHandler = async () => {
    if (!input.title || !input.description || !input.date || !input.categoryId) {
      return;
    }

    const newTask: ITask = {
      title: input.title,
      description: input.description,
      date: input.date.toISOString(),
      categoryId: input.categoryId,
      categoryName: input.categoryName,
    };

    try {
      addTask(newTask);
      navigation.goBack();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    } finally {
      setInput({ title: '', description: '', date: new Date(), categoryId: '', categoryName: '' });
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
      <View style={styles.categoriesContainer}>
        <View style={styles.categoriesTitleContainer}>
          <Text fontType="medium" variant="titleLarge">
            Pick Category
          </Text>
          {categories.length > 0 && (
            <Button icon="plus" onPress={addNewCategoryHandler}>
              Add Category
            </Button>
          )}
        </View>
        {isLoading && <Loading size="large" />}
        {error?.isError && (
          <Text fontType="medium" style={styles.error} variant="headlineSmall">
            {error.errorMessage}
          </Text>
        )}
        {!isLoading && !error.isError && categories.length === 0 && (
          <View style={styles.categoriesEmptyContainer}>
            <Text fontType="medium" variant="headlineSmall">
              Categories Empty
            </Text>
            <Button icon="plus" onPress={addNewCategoryHandler} mode="elevated">
              Add Category
            </Button>
          </View>
        )}
        {!isLoading && !error.isError && categories.length > 0 && (
          <FlatList
            data={formatData(categories, numColumns)}
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
      <Button mode="contained" style={styles.button} onPress={submitTaskHandler}>
        <Text fontType="semibold" variant="titleMedium">
          Add Task
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
