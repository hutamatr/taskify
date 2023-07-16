import { MaterialIcons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import AllTask from '@screens/AllTask';
import Categories from '@screens/Categories';
import Home from '@screens/Home';
import Profile from '@screens/Profile';

import type { RootStackParamList } from 'types/types';

const Tabs = createMaterialBottomTabNavigator<RootStackParamList>();

export default function HomeTabsNavigation() {
  return (
    <Tabs.Navigator>
      <Tabs.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <MaterialIcons name="home" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="Tasks"
        component={AllTask}
        options={{
          title: 'Tasks',
          tabBarIcon: ({ color }) => <MaterialIcons name="add-task" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="Categories"
        component={Categories}
        options={{
          title: 'Categories',
          tabBarIcon: ({ color }) => <MaterialIcons name="category" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="Profile"
        component={Profile}
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
