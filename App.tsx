import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PaperProvider, MD3LightTheme as DefaultTheme } from 'react-native-paper';
import {
  useFonts,
  PlusJakartaSans_400Regular,
  PlusJakartaSans_500Medium,
  PlusJakartaSans_700Bold,
  PlusJakartaSans_600SemiBold,
} from '@expo-google-fonts/plus-jakarta-sans';

import CreateTaskPage from './screens/CreateTaskPage';
import HomeTabsNavigation from './navigation/HomeTabsNavigation';

import { RootStackParamList } from './types/types';

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
  const [fontsLoaded] = useFonts(customFonts);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator>
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
          <Stack.Screen name="CreateTask" component={CreateTaskPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
