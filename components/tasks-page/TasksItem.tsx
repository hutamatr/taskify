import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { Alert, GestureResponderEvent, StyleSheet, View } from 'react-native';
import { Card, Menu, useTheme } from 'react-native-paper';
import { shallow } from 'zustand/shallow';

import Text from '../ui/Text';
import { useStore } from '../../store/useStore';
import type { ITask } from '../../types/types';

export default function TasksItem({
  title,
  description,
  date,
  isCompleted,
  categoryName,
  id,
}: ITask) {
  const [visible, setVisible] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState({ x: 0, y: 0 });

  const { deleteTask } = useStore(
    (state) => ({ deleteTask: state.deleteTaskHandler, editTask: state.updateTaskHandler }),
    shallow
  );

  const theme = useTheme();

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

  const editTaskHandler = () => {
    //
  };

  return (
    <Card
      style={[
        styles.itemContainer,
        { backgroundColor: isCompleted ? theme.colors.primary : theme.colors.inversePrimary },
      ]}
      mode="contained"
      contentStyle={styles.itemContainer}
    >
      <Card.Content style={styles.cardContentContainer}>
        <View style={styles.taskContainer}>
          <View style={styles.titleContainer}>
            <Text variant="headlineSmall" fontType="medium" numberOfLines={1} lineBreakMode="tail">
              {title}
            </Text>
            <Text variant="labelLarge" fontType="medium" numberOfLines={1} lineBreakMode="tail">
              {categoryName ?? ''}
            </Text>
          </View>
          <Text variant="bodyLarge" fontType="medium" numberOfLines={2} lineBreakMode="tail">
            {description}
          </Text>
        </View>
        <View style={styles.titleContainer}>
          <Text variant="bodySmall" fontType="regular">
            {new Date(date).toLocaleString()}
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
