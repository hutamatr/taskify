import 'expo-dev-client';

import {
  PlusJakartaSans_400Regular,
  PlusJakartaSans_500Medium,
  PlusJakartaSans_600SemiBold,
  PlusJakartaSans_700Bold,
  useFonts,
} from '@expo-google-fonts/plus-jakarta-sans';
import { useMaterial3Theme } from '@pchmn/expo-material3-theme';
import auth from '@react-native-firebase/auth';
import { NavigationContainer } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useColorScheme, View } from 'react-native';
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from 'react-native-paper';

import RootNavigation from '@navigation/RootNavigation';

import { useStore } from '@store/useStore';

const customFonts = {
  'plus-jakarta-sans-regular': PlusJakartaSans_400Regular,
  'plus-jakarta-sans-medium': PlusJakartaSans_500Medium,
  'plus-jakarta-sans-bold': PlusJakartaSans_700Bold,
  'plus-jakarta-sans-semibold': PlusJakartaSans_600SemiBold,
};

const colors = {
  light: '#3E8260',
  dark: '#ADF2C7',
};

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [initializing, setInitializing] = useState(true);
  const [appIsReady, setAppIsReady] = useState(false);
  const [isAuth, setIsAuth] = useState<boolean>(false);

  const colorScheme = useColorScheme();
  const { theme } = useMaterial3Theme({
    fallbackSourceColor: colors.light,
  });

  const paperTheme = useMemo(
    () =>
      colorScheme === 'dark'
        ? { ...MD3DarkTheme, colors: theme.dark }
        : { ...MD3LightTheme, colors: theme.light },
    [colorScheme, theme]
  );

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

      setAppIsReady(true);
    });
    return subscriber; // unsubscribe on unmount
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!fontsLoaded || initializing || !appIsReady) {
    return null;
  }

  return (
    <>
      <StatusBar style="auto" animated hideTransitionAnimation="fade" />
      <PaperProvider theme={paperTheme}>
        <NavigationContainer>
          <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
            <RootNavigation isAuth={isAuth} />
          </View>
        </NavigationContainer>
      </PaperProvider>
    </>
  );
}
