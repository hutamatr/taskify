import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useLayoutEffect, useMemo, useState } from 'react';
import { Alert, GestureResponderEvent, StyleSheet, View } from 'react-native';
import { Menu } from 'react-native-paper';
import { shallow } from 'zustand/shallow';

import TasksList from '@components/all-tasks-screen/TasksList';
import Text from '@components/ui/Text';

import { useStore } from '@store/useStore';

import type { CategoriesDetailNavigationProp, CategoriesDetailScreenRouteProp } from 'types/types';

export default function CategoriesDetail() {
  const [visible, setVisible] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState({ x: 0, y: 0 });
  const route = useRoute<CategoriesDetailScreenRouteProp>();
  const navigation = useNavigation<CategoriesDetailNavigationProp>();

  const { authInfo, tasks, tasksStatus, tasksError, deleteCategory } = useStore(
    (state) => ({
      authInfo: state.authInfo,
      tasks: state.tasks,
      tasksStatus: state.tasksStatus,
      tasksError: state.tasksError,
      deleteCategory: state.deleteCategoryHandler,
    }),
    shallow
  );
  // const [taskByCategory, taskByCategoryLoading, taskByCategoryError] = useCollection(
  //   queryTasksByCategory(authInfo?.uid as string, route.params.id as string)
  // );

  // const taskByCategoryData = useFormatData<ITask[]>(taskByCategory);

  const tasksByCategory = useMemo(() => {
    const tasksCategory = tasks
      .filter((task) => task.categoryId === route.params.id)
      .sort((a, b) => +new Date(b.date as string) - +new Date(a.date as string));
    return tasksCategory;
  }, [tasks, route.params]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Text fontType="regular" variant="titleLarge">
          {route.params.name}
        </Text>
      ),
      headerRight: () => (
        <MaterialCommunityIcons
          name="dots-vertical"
          size={24}
          color="black"
          onPress={onIconPress}
        />
      ),
    });
  }, [navigation, route]);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const onIconPress = (event: GestureResponderEvent) => {
    const { nativeEvent } = event;
    const anchor = {
      x: nativeEvent.pageX,
      y: nativeEvent.pageY,
    };

    setMenuAnchor(anchor);
    openMenu();
  };

  const deleteCategoryHandler = () => {
    if (tasksByCategory?.length === 0) {
      Alert.alert('Confirm Delete', 'Are you sure you want to delete this category?', [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          onPress: () => {
            deleteCategory(route.params.id as string, false, authInfo?.uid as string);
          },
          style: 'default',
        },
      ]);
    } else {
      Alert.alert(
        'Warning!',
        'This category has tasks, do you want to delete it and all tasks in this category or just delete the category?',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Category only',
            onPress: () => {
              deleteCategory(route.params.id as string, false, authInfo?.uid as string);
            },
            style: 'cancel',
          },
          {
            text: 'Delete all',
            onPress: () => {
              deleteCategory(route.params.id as string, true, authInfo?.uid as string);
            },
            style: 'default',
          },
        ]
      );
    }
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TasksList
        tasks={tasksByCategory}
        isLoading={tasksStatus === 'pending'}
        error={tasksError?.error}
      />
      <Menu visible={visible} onDismiss={closeMenu} anchor={menuAnchor}>
        <Menu.Item onPress={deleteCategoryHandler} title="Delete" leadingIcon="delete" />
      </Menu>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 16,
  },
});
