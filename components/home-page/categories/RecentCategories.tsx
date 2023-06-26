import { useNavigation } from '@react-navigation/native';
import { Dimensions, StyleSheet, View } from 'react-native';

import CategoriesItem from '../../categories-page/CategoriesItem';
import Text from '../../ui/Text';
import { useStore } from '../../../store/useStore';
import type { HomeNavigationProp, ICategories } from '../../../types/types';

export default function RecentCategories() {
  const categories = useStore((state) => state.categories);

  const navigation = useNavigation<HomeNavigationProp>();

  const viewCategoriesDetailHandler = (category: ICategories) => {
    navigation.navigate('CategoriesDetail', { ...category });
  };

  return (
    <View style={styles.container}>
      {categories.length === 0 ? (
        <View style={styles.categoriesEmptyContainer}>
          <Text style={styles.categoriesEmptyText} fontType="medium">
            Category Empty
          </Text>
        </View>
      ) : (
        <View style={styles.recentCategoriesContainer}>
          {categories.slice(0, 2).map((category) => {
            return (
              <CategoriesItem
                key={category.id as string}
                name={category.name}
                style={styles.categoriesItem}
                textVariant="titleMedium"
                mode="contained"
                onPress={viewCategoriesDetailHandler.bind(null, category)}
              />
            );
          })}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  recentCategoriesContainer: {
    flexGrow: 1,
    flexDirection: 'row',
    columnGap: 6,
    margin: 8,
  },
  cardContent: {
    padding: 8,
  },
  categoriesEmptyContainer: {
    padding: 8,
    margin: 24,
    borderRadius: 8,
    backgroundColor: '#cfcf',
  },
  categoriesEmptyText: {
    fontSize: 20,
    textAlign: 'center',
  },
  categoriesItem: {
    height: Dimensions.get('window').width / 6,
  },
});
