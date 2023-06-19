import { StyleSheet, View } from 'react-native';

import Text from '../../ui/Text';
import CategoriesItem from '../../categories-page/CategoriesItem';
import { DUMMY_CATEGORIES } from '../../../utils/dummy';

export default function RecentCategories() {
  return (
    <View style={styles.container}>
      {DUMMY_CATEGORIES.length === 0 ? (
        <View style={styles.categoriesEmptyContainer}>
          <Text style={styles.categoriesEmptyText} fontType="medium">
            Category Empty
          </Text>
        </View>
      ) : (
        <View style={styles.recentCategoriesContainer}>
          {DUMMY_CATEGORIES.slice(0, 3).map((category) => {
            return (
              <CategoriesItem
                key={category.id}
                name={category.name}
                style={styles.categoriesItem}
                textVariant="titleMedium"
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
    // marginVertical: 4,
    // padding: 4,
    // justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
});
