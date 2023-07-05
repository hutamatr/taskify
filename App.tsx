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
import CategoriesDetailPage from './screens/CategoriesDetailPage';
import CreateTaskPage from './screens/CreateTaskPage';
import SignInPage from './screens/SignInPage';
import SignUpPage from './screens/SignUpPage';
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

  const [fontsLoaded] = useFonts(customFonts);
  const authHandler = useStore((state) => state.authHandler);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((user) => {
      if (user) {
        setIsAuth(!!user.uid);
        authHandler(user);
      } else {
        setIsAuth(false);
      }
      if (initializing) {
        setInitializing(false);
      }
    });
    return () => subscriber(); // unsubscribe on unmount
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
                  component={CreateTaskPage}
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
                  name="CategoriesDetail"
                  component={CategoriesDetailPage}
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
                  component={SignInPage}
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
                  component={SignUpPage}
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
