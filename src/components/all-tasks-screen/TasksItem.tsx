import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Alert, GestureResponderEvent, StyleSheet, View } from 'react-native';
import { Card, Menu } from 'react-native-paper';
import { shallow } from 'zustand/shallow';

import Text from '@components/ui/Text';

import { useStore } from '@store/useStore';

import { useAppTheme } from '@hooks/useAppTheme';

import type { ITask, TasksNavigationProp } from 'types/types';

export default function TasksItem({
  title,
  description,
  date,
  isCompleted,
  categoryId,
  categoryName,
  id,
}: ITask) {
  const [visible, setVisible] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState({ x: 0, y: 0 });

  const navigation = useNavigation<TasksNavigationProp>();

  const { deleteTask, updateTask } = useStore(
    (state) => ({
      deleteTask: state.deleteTaskHandler,
      updateTask: state.updateTaskHandler,
    }),
    shallow
  );

  const theme = useAppTheme();

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const onIconPress = ({ nativeEvent }: GestureResponderEvent) => {
    const anchor = {
      x: nativeEvent.pageX,
      y: nativeEvent.pageY,
    };

    setMenuAnchor(anchor);
    openMenu();
  };

  const markAsDoneHandler = () => {
    if (!isCompleted) {
      updateTask({
        id: id as string,
        isCompleted: true,
      });
    } else {
      updateTask({
        id: id as string,
        isCompleted: false,
      });
    }
    closeMenu();
  };

  const editTaskHandler = () => {
    navigation.navigate('EditTask', { id, title, description, date, categoryId, categoryName });
    closeMenu();
  };

  const deleteTaskHandler = () => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this task?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          onPress: () => {
            deleteTask(id as string);
          },
          style: 'default',
        },
      ],
      { cancelable: true }
    );
    closeMenu();
  };

  return (
    <Card
      style={[
        styles.itemContainer,
        {
          backgroundColor: isCompleted ? theme.colors.primary : theme.colors.inversePrimary,
        },
      ]}
      mode="contained"
      contentStyle={styles.itemContainer}
    >
      <Card.Content style={styles.cardContentContainer}>
        <View style={styles.taskContainer}>
          <View style={styles.titleContainer}>
            <Text
              variant="headlineSmall"
              fontType="medium"
              numberOfLines={1}
              lineBreakMode="tail"
              style={{
                color: isCompleted ? theme.colors.onPrimary : theme.colors.onSurface,
              }}
            >
              {title}
            </Text>
            <Text
              variant="labelLarge"
              fontType="medium"
              numberOfLines={1}
              lineBreakMode="tail"
              style={{
                color: isCompleted ? theme.colors.onPrimary : theme.colors.onSurface,
              }}
            >
              {categoryName ?? ''}
            </Text>
          </View>
          <Text
            variant="bodyLarge"
            fontType="medium"
            numberOfLines={2}
            lineBreakMode="tail"
            style={{
              color: isCompleted ? theme.colors.onPrimary : theme.colors.onSurface,
            }}
          >
            {description}
          </Text>
        </View>
        <View style={styles.titleContainer}>
          <Text
            variant="bodySmall"
            fontType="regular"
            style={{
              color: isCompleted ? theme.colors.onPrimary : theme.colors.onSurface,
            }}
          >
            {new Date(date as string).toLocaleString()}
          </Text>
          <MaterialCommunityIcons
            name="dots-vertical"
            size={22}
            color="black"
            onPress={onIconPress}
          />
        </View>
      </Card.Content>
      <Menu visible={visible} onDismiss={closeMenu} anchor={menuAnchor}>
        <Menu.Item
          onPress={markAsDoneHandler}
          title={isCompleted ? 'Mark uncompleted' : 'Mark completed'}
          leadingIcon="check-circle-outline"
        />
        <Menu.Item onPress={editTaskHandler} title="Edit" leadingIcon="pen" />
        <Menu.Item onPress={deleteTaskHandler} title="Delete" leadingIcon="delete" />
      </Menu>
    </Card>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    display: 'flex',
    width: '100%',
    marginBottom: 16,
    padding: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  taskContainer: {
    rowGap: 4,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardContentContainer: {
    flex: 2,
    rowGap: 24,
  },
});
