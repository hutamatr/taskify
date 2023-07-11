import {
  PlusJakartaSans_400Regular,
  PlusJakartaSans_500Medium,
  PlusJakartaSans_600SemiBold,
  PlusJakartaSans_700Bold,
  useFonts,
} from '@expo-google-fonts/plus-jakarta-sans';
import auth from '@react-native-firebase/auth';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';
import 'expo-dev-client';

import Text from './components/ui/Text';
import HomeTabsNavigation from './navigation/HomeTabsNavigation';
import CategoriesDetail from './screens/CategoriesDetail';
import CreateTask from './screens/CreateTask';
import EditProfile from './screens/EditProfile';
import EditTask from './screens/EditTask';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import { useStore } from './store/useStore';
import type { RootStackParamList } from './types/types';

const customFonts = {
  'plus-jakarta-sans-regular': PlusJakartaSans_400Regular,
  'plus-jakarta-sans-medium': PlusJakartaSans_500Medium,
  'plus-jakarta-sans-bold': PlusJakartaSans_700Bold,
  'plus-jakarta-sans-semibold': PlusJakartaSans_600SemiBold,
};

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'violet',
    secondary: 'tomato',
  },
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [initializing, setInitializing] = useState(true);
  const [isAuth, setIsAuth] = useState<boolean>(false);

  const authHandler = useStore((state) => state.authHandler);

  const [fontsLoaded] = useFonts(customFonts);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((user) => {
      if (user) {
        authHandler(user);
        setIsAuth(!!user.uid);
      } else {
        setIsAuth(false);
      }
      if (initializing) {
        setInitializing(false);
      }
    });
    return subscriber; // unsubscribe on unmount
  }, []);

  if (!fontsLoaded || initializing) {
    return null;
  }

  return (
    <>
      <StatusBar style="auto" animated hideTransitionAnimation="fade" />
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator>
            {isAuth ? (
              <>
                <Stack.Screen
                  name="HomeTabs"
                  component={HomeTabsNavigation}
                  options={{
                    title: '',
                    headerShadowVisible: false,
                    headerStyle: { backgroundColor: theme.colors.inversePrimary },
                    headerShown: false,
                    statusBarStyle: 'dark',
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
                    statusBarStyle: 'dark',
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
                    statusBarStyle: 'dark',
                    statusBarColor: theme.colors.inversePrimary,
                  }}
                />
                <Stack.Screen
                  name="CategoriesDetail"
                  component={CategoriesDetail}
                  options={{
                    headerShadowVisible: false,
                    headerStyle: { backgroundColor: theme.colors.inversePrimary },
                    statusBarStyle: 'dark',
                    statusBarColor: theme.colors.inversePrimary,
                  }}
                />
                <Stack.Screen
                  name="EditProfile"
                  component={EditProfile}
                  options={{
                    headerShadowVisible: false,
                    headerStyle: { backgroundColor: theme.colors.inversePrimary },
                    statusBarStyle: 'dark',
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
                    headerStyle: { backgroundColor: theme.colors.inversePrimary },
                    headerShown: false,
                    statusBarStyle: 'dark',
                    statusBarColor: theme.colors.inversePrimary,
                  }}
                />
                <Stack.Screen
                  name="SignUp"
                  component={SignUp}
                  options={{
                    title: '',
                    headerShadowVisible: false,
                    headerStyle: { backgroundColor: theme.colors.inversePrimary },
                    headerShown: false,
                    statusBarStyle: 'dark',
                    statusBarColor: theme.colors.inversePrimary,
                  }}
                />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </>
  );
}
