import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';

import HomePage from '../screens/HomePage';
import AllTaskPage from '../screens/AllTaskPage';
import CategoriesPage from '../screens/CategoriesPage';
import AccountPage from '../screens/AccountPage';

import { RootStackParamList } from '../types/types';

const Tab = createMaterialBottomTabNavigator<RootStackParamList>();

export default function HomeTabsNavigation() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomePage}
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <MaterialIcons name="home" size={24} color={color} />,
        }}
      />
      <Tab.Screen
        name="Tasks"
        component={AllTaskPage}
        options={{
          title: 'Tasks',
          tabBarIcon: ({ color }) => <MaterialIcons name="add-task" size={24} color={color} />,
        }}
      />
      <Tab.Screen
        name="Categories"
        component={CategoriesPage}
        options={{
          title: 'Categories',
          tabBarIcon: ({ color }) => <MaterialIcons name="category" size={24} color={color} />,
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountPage}
        options={{
          title: 'Account',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="account-circle" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
