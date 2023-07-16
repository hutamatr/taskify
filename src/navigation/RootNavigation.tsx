import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Text from '@components/ui/Text';

import CategoriesDetail from '@screens/CategoriesDetail';
import CreateTask from '@screens/CreateTask';
import EditProfile from '@screens/EditProfile';
import EditTask from '@screens/EditTask';
import SignIn from '@screens/SignIn';
import SignUp from '@screens/SignUp';

import { useAppTheme } from '@hooks/useAppTheme';

import HomeTabsNavigation from './HomeTabsNavigation';

import type { RootStackParamList } from 'types/types';

const Stack = createNativeStackNavigator<RootStackParamList>();

interface IRootNavigationProps {
  isAuth: boolean;
}

export default function RootNavigation({ isAuth }: IRootNavigationProps) {
  const theme = useAppTheme();

  return (
    <>
      <Stack.Navigator>
        {isAuth ? (
          <>
            <Stack.Screen
              name="HomeTabs"
              component={HomeTabsNavigation}
              options={{
                title: '',
                headerShadowVisible: false,
                // headerStyle: { backgroundColor: theme.colors.inversePrimary },
                headerShown: false,
                statusBarStyle: 'auto',
                statusBarColor: theme.colors.inversePrimary,
              }}
            />
            <Stack.Screen
              name="CreateTask"
              component={CreateTask}
              options={{
                title: 'Create Task',
                headerShadowVisible: false,
                headerTitle: () => (
                  <Text fontType="regular" variant="headlineSmall">
                    Create Task
                  </Text>
                ),
                headerStyle: { backgroundColor: theme.colors.inversePrimary },
                statusBarStyle: 'auto',
                statusBarColor: theme.colors.inversePrimary,
              }}
            />
            <Stack.Screen
              name="EditTask"
              component={EditTask}
              options={{
                title: 'Edit Task',
                headerShadowVisible: false,
                headerTitle: () => (
                  <Text fontType="regular" variant="headlineSmall">
                    Edit Task
                  </Text>
                ),
                headerStyle: { backgroundColor: theme.colors.inversePrimary },
                statusBarStyle: 'auto',
                statusBarColor: theme.colors.inversePrimary,
              }}
            />
            <Stack.Screen
              name="CategoriesDetail"
              component={CategoriesDetail}
              options={{
                headerShadowVisible: false,
                headerStyle: { backgroundColor: theme.colors.inversePrimary },
                statusBarStyle: 'auto',
                statusBarColor: theme.colors.inversePrimary,
              }}
            />
            <Stack.Screen
              name="EditProfile"
              component={EditProfile}
              options={{
                headerShadowVisible: false,
                headerStyle: { backgroundColor: theme.colors.inversePrimary },
                statusBarStyle: 'auto',
                statusBarColor: theme.colors.inversePrimary,
              }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="SignIn"
              component={SignIn}
              options={{
                title: '',
                headerShadowVisible: false,
                headerShown: false,
                headerStyle: { backgroundColor: theme.colors.inversePrimary },
                statusBarStyle: 'auto',
                statusBarColor: theme.colors.inversePrimary,
              }}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUp}
              options={{
                title: '',
                headerShadowVisible: false,
                // headerStyle: { backgroundColor: theme.colors.inversePrimary },
                headerShown: false,
                statusBarStyle: 'auto',
                statusBarColor: theme.colors.inversePrimary,
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </>
  );
}
