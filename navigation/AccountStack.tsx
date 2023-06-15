import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from 'react-native-paper';

import AccountPage from '../screens/AccountPage';

import { RootStackParamList } from '../types/types';

const Native = createNativeStackNavigator<RootStackParamList>();

export default function AccountStack() {
  const theme = useTheme();

  return (
    <>
      <Native.Navigator>
        <Native.Screen
          name="Account"
          component={AccountPage}
          options={{
            title: 'Account',
            headerShadowVisible: false,
            headerStyle: { backgroundColor: theme.colors.inversePrimary },
          }}
        />
      </Native.Navigator>
    </>
  );
}
