import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from 'react-native-paper';

import AllTaskPage from '../screens/AllTaskPage';

import { RootStackParamList } from '../types/types';

const Native = createNativeStackNavigator<RootStackParamList>();

export default function AllTaskStack() {
  const theme = useTheme();

  return (
    <>
      <Native.Navigator>
        <Native.Screen
          name="Tasks"
          component={AllTaskPage}
          options={{
            title: 'Your Tasks',
            headerShadowVisible: false,
            headerStyle: { backgroundColor: theme.colors.inversePrimary },
          }}
        />
      </Native.Navigator>
    </>
  );
}
