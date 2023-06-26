import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useEffect, useLayoutEffect, useState } from 'react';
import { Alert, GestureResponderEvent, StyleSheet, View } from 'react-native';
import { Menu } from 'react-native-paper';
import { shallow } from 'zustand/shallow';

import TasksList from '../components/tasks-page/TasksList';
import Text from '../components/ui/Text';
import { useStore } from '../store/useStore';
import type {
  CategoriesDetailNavigationProp,
  CategoriesDetailScreenRouteProp,
} from '../types/types';

export default function CategoriesDetailPage() {
  const [visible, setVisible] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState({ x: 0, y: 0 });

  const route = useRoute<CategoriesDetailScreenRouteProp>();
  const navigation = useNavigation<CategoriesDetailNavigationProp>();

  const { fetchAllTasksByCategory, deleteCategory, tasksByCategory } = useStore(
    (state) => ({
      fetchAllTasksByCategory: state.fetchAllTasksByCategoryHandler,
      deleteCategory: state.deleteCategoryHandler,
      tasksByCategory: state.tasksByCategory,
    }),
    shallow
  );

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

  useEffect(() => {
    fetchAllTasksByCategory(route.params.id as string);
  }, [route]);

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
    if (tasksByCategory.length === 0) {
      Alert.alert('Confirm Delete', 'Are you sure you want to delete this category?', [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          onPress: () => {
            deleteCategory(route.params.id as string, false);
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
              deleteCategory(route.params.id as string, false);
            },
            style: 'cancel',
          },
          {
            text: 'Delete all',
            onPress: () => {
              deleteCategory(route.params.id as string, true);
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
      <TasksList tasks={tasksByCategory} />
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
