import { useNavigation } from '@react-navigation/native';
import { Dimensions, StyleSheet, View } from 'react-native';
import { shallow } from 'zustand/shallow';

import CategoriesItem from '@components/categories-screen/CategoriesItem';
import Loading from '@components/ui/Loading';
import Text from '@components/ui/Text';

import { useStore } from '@store/useStore';

import { useAppTheme } from '@hooks/useAppTheme';

import type { HomeNavigationProp, ICategories } from 'types/types';

export default function RecentCategories() {
  const theme = useAppTheme();
  const navigation = useNavigation<HomeNavigationProp>();

  const { categories, categoriesStatus } = useStore(
    (state) => ({
      categories: state.categories,
      categoriesStatus: state.categoriesStatus,
    }),
    shallow
  );

  const viewCategoriesDetailHandler = (category: ICategories) => {
    navigation.navigate('CategoriesDetail', { ...category });
  };

  return (
    <View style={styles.container}>
      {categoriesStatus === 'pending' && <Loading size="large" />}
      {categoriesStatus === 'rejected' && (
        <Text fontType="medium" style={styles.error} variant="headlineSmall">
          Failed view recent categories!
        </Text>
      )}
      {categories?.length === 0 && (
        <View style={styles.categoriesEmptyContainer}>
          <Text style={styles.categoriesEmptyText} fontType="medium">
            Category Empty
          </Text>
        </View>
      )}
      {categoriesStatus === 'successful' && (
        <View style={styles.recentCategoriesContainer}>
          {categories.slice(0, 2).map((category) => {
            if (!category.name) {
              return (
                <CategoriesItem
                  key={Number(category.id as string) + 1}
                  style={[styles.categoriesItem, { backgroundColor: 'transparent' }]}
                  mode={undefined}
                  name=""
                />
              );
            }
            return (
              <CategoriesItem
                key={category.id}
                name={category.name}
                style={styles.categoriesItem}
                textStyle={{ color: theme.colors.surface }}
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    textAlign: 'center',
    margin: 24,
    color: 'red',
  },
});
