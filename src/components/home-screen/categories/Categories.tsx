import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';

import Text from '@components/ui/Text';

import RecentCategories from './RecentCategories';

import type { CategoriesNavigationProp } from 'types/types';

export default function Categories() {
  const navigation = useNavigation<CategoriesNavigationProp>();

  const showAllCategoriesHandler = () => {
    navigation.navigate('Categories', { snackbarShow: false });
  };

  return (
    <View style={styles.categoryContainer}>
      <View style={styles.titleCategoryContainer}>
        <Text variant="headlineSmall" fontType="regular">
          Recent Categories
        </Text>
        <Button mode="text" onPress={showAllCategoriesHandler}>
          See all
        </Button>
      </View>
      <View style={styles.cardCategoryContainer}>
        <RecentCategories />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  categoryContainer: {
    marginHorizontal: 16,
  },
  titleCategoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  cardCategoryContainer: {
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    columnGap: 8,
    marginVertical: 8,
  },
});
