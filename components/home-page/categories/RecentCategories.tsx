import { useNavigation } from '@react-navigation/native';
import { useCollection } from '@skillnation/react-native-firebase-hooks/firestore';
import { Dimensions, StyleSheet, View } from 'react-native';

import CategoriesItem from '../../categories-page/CategoriesItem';
import Loading from '../../ui/Loading';
import Text from '../../ui/Text';
import { queryCategories } from '../../../api/api';
import useFormatData from '../../../hooks/useFormatData';
import { useStore } from '../../../store/useStore';
import type { HomeNavigationProp, ICategories } from '../../../types/types';

export default function RecentCategories() {
  const userInfo = useStore((state) => state.userInfo);

  const [categories, loading, _error] = useCollection(queryCategories(userInfo?.uid as string));

  const categoriesData = useFormatData<ICategories[]>(categories);

  const navigation = useNavigation<HomeNavigationProp>();

  const viewCategoriesDetailHandler = (category: ICategories) => {
    navigation.navigate('CategoriesDetail', { ...category });
  };

  return (
    <View style={styles.container}>
      {loading && <Loading size="large" />}
      {categoriesData?.length === 0 && (
        <View style={styles.categoriesEmptyContainer}>
          <Text style={styles.categoriesEmptyText} fontType="medium">
            Category Empty
          </Text>
        </View>
      )}
      {categoriesData.length > 0 && (
        <View style={styles.recentCategoriesContainer}>
          {categoriesData.slice(0, 2).map((category) => {
            if (!category.name) {
              return (
                <CategoriesItem
                  key={category.name + category.id}
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
