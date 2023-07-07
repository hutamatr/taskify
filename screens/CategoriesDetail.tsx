import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useCollection } from '@skillnation/react-native-firebase-hooks/firestore';
import { useLayoutEffect, useState } from 'react';
import { Alert, GestureResponderEvent, StyleSheet, View } from 'react-native';
import { Menu } from 'react-native-paper';
import { shallow } from 'zustand/shallow';

import { queryTasksByCategory } from '../api/api';
import TasksList from '../components/all-tasks-screen/TasksList';
import Text from '../components/ui/Text';
import useFormatData from '../hooks/useFormatData';
import { useStore } from '../store/useStore';
import type {
  CategoriesDetailNavigationProp,
  CategoriesDetailScreenRouteProp,
  ITask,
} from '../types/types';

export default function CategoriesDetail() {
  const [visible, setVisible] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState({ x: 0, y: 0 });
  const route = useRoute<CategoriesDetailScreenRouteProp>();
  const navigation = useNavigation<CategoriesDetailNavigationProp>();

  const { userInfo, deleteCategory } = useStore(
    (state) => ({
      userInfo: state.userInfo,
      deleteCategory: state.deleteCategoryHandler,
    }),
    shallow
  );

  const [taskByCategory, taskByCategoryLoading, taskByCategoryError] = useCollection(
    queryTasksByCategory(userInfo?.uid as string, route.params.id as string)
  );

  const taskByCategoryData = useFormatData<ITask[]>(taskByCategory);

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
    if (taskByCategoryData.length === 0) {
      Alert.alert('Confirm Delete', 'Are you sure you want to delete this category?', [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          onPress: () => {
            deleteCategory(route.params.id as string, false, userInfo?.uid as string);
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
              deleteCategory(route.params.id as string, false, userInfo?.uid as string);
            },
            style: 'cancel',
          },
          {
            text: 'Delete all',
            onPress: () => {
              deleteCategory(route.params.id as string, true, userInfo?.uid as string);
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
        tasks={taskByCategoryData}
        isLoading={taskByCategoryLoading}
        error={taskByCategoryError}
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
