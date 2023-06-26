import { MaterialIcons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import AllTaskPage from '../screens/AllTaskPage';
import CategoriesPage from '../screens/CategoriesPage';
import HomePage from '../screens/HomePage';
import ProfilePage from '../screens/ProfilePage';
import type { RootStackParamList } from '../types/types';

const Tabs = createMaterialBottomTabNavigator<RootStackParamList>();

export default function HomeTabsNavigation() {
  return (
    <Tabs.Navigator>
      <Tabs.Screen
        name="Home"
        component={HomePage}
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <MaterialIcons name="home" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="Tasks"
        component={AllTaskPage}
        options={{
          title: 'Tasks',
          tabBarIcon: ({ color }) => <MaterialIcons name="add-task" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="Categories"
        component={CategoriesPage}
        options={{
          title: 'Categories',
          tabBarIcon: ({ color }) => <MaterialIcons name="category" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="Profile"
        component={ProfilePage}
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="account-circle" size={24} color={color} />
          ),
        }}
      />
    </Tabs.Navigator>
  );
}
