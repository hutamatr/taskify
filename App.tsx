import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { PaperProvider, MD3LightTheme as DefaultTheme } from 'react-native-paper';
import {
  useFonts,
  PlusJakartaSans_400Regular,
  PlusJakartaSans_500Medium,
  PlusJakartaSans_700Bold,
  PlusJakartaSans_600SemiBold,
} from '@expo-google-fonts/plus-jakarta-sans';
import { MaterialIcons } from '@expo/vector-icons';

import HomePage from './screens/HomePage';
import CategoryStack from './navigation/CategoryStack';
import AccountStack from './navigation/AccountStack';
import AllTaskStack from './navigation/AllTaskStack';

import { RootStackParamListTabs } from './types/types';

const customFonts = {
  'plus-jakarta-sans-regular': PlusJakartaSans_400Regular,
  'plus-jakarta-sans-medium': PlusJakartaSans_500Medium,
  'plus-jakarta-sans-bold': PlusJakartaSans_700Bold,
  'plus-jakarta-sans-semi-bold': PlusJakartaSans_600SemiBold,
};

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    secondary: 'yellow',
  },
};

const Tab = createMaterialBottomTabNavigator<RootStackParamListTabs>();

export default function App() {
  const [fontsLoaded] = useFonts(customFonts);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
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
            name="AllTasksStack"
            component={AllTaskStack}
            options={{
              title: 'Tasks',
              tabBarIcon: ({ color }) => <MaterialIcons name="add-task" size={24} color={color} />,
            }}
          />
          <Tab.Screen
            name="CategoryStack"
            component={CategoryStack}
            options={{
              title: 'Categories',
              tabBarIcon: ({ color }) => <MaterialIcons name="category" size={24} color={color} />,
            }}
          />
          <Tab.Screen
            name="AccountStack"
            component={AccountStack}
            options={{
              title: 'Account',
              tabBarIcon: ({ color }) => (
                <MaterialIcons name="account-circle" size={24} color={color} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
