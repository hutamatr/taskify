import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from 'react-native-paper';

import CategoryPage from '../screens/CategoryPage';

import { RootStackParamList } from '../types/types';

const Native = createNativeStackNavigator<RootStackParamList>();

export default function CategoryStack() {
  const theme = useTheme();

  return (
    <>
      <Native.Navigator>
        <Native.Screen
          name="Category"
          component={CategoryPage}
          options={{
            title: 'Category',
            headerShadowVisible: false,
            headerStyle: { backgroundColor: theme.colors.inversePrimary },
          }}
        />
      </Native.Navigator>
    </>
  );
}
