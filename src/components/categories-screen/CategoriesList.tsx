import { useNavigation } from '@react-navigation/native';
import {
  Dimensions,
  FlatList,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
  StyleSheet,
  View,
} from 'react-native';

import Loading from '@components/ui/Loading';
import Text from '@components/ui/Text';

import { useAppTheme } from '@hooks/useAppTheme';
import { formatList } from '@utils/formatList';

import CategoriesItem from './CategoriesItem';

import type { CategoriesNavigationProp, ICategories } from 'types/types';

interface ICategoriesListProps {
  onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  isLoading: boolean;
  error: Error | undefined;
  categories: ICategories[];
}

const numColumns = 2;

export default function CategoriesList({
  onScroll,
  categories,
  isLoading,
  error,
}: ICategoriesListProps) {
  const navigation = useNavigation<CategoriesNavigationProp>();
  const theme = useAppTheme();

  const viewCategoriesDetailHandler = (category: ICategories) => {
    navigation.navigate('CategoriesDetail', { ...category });
  };

  return (
    <View style={styles.listContainer}>
      {isLoading && <Loading size="large" />}
      {error && (
        <Text fontType="medium" style={styles.error} variant="headlineSmall">
          Failed view categories list!
        </Text>
      )}
      {!isLoading && !error && categories?.length === 0 && (
        <View style={styles.categoriesEmptyContainer}>
          <Text fontType="medium" variant="headlineSmall">
            Categories Empty
          </Text>
        </View>
      )}
      {!isLoading && !error && categories && categories.length > 0 && (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={formatList(categories, numColumns)}
          renderItem={({ item }) => {
            if (!item.name) {
              return (
                <CategoriesItem
                  style={[styles.categoriesItem, { backgroundColor: 'transparent' }]}
                  mode={undefined}
                  name=""
                />
              );
            }
            return (
              <CategoriesItem
                {...item}
                mode={undefined}
                style={styles.categoriesItem}
                textStyle={{ color: theme.colors.surface }}
                textVariant="titleMedium"
                onPress={viewCategoriesDetailHandler.bind(null, item)}
              />
            );
          }}
          keyExtractor={({ id }) => id as string}
          numColumns={numColumns}
          contentContainerStyle={styles.container}
          columnWrapperStyle={styles.row}
          onScroll={onScroll}
          scrollEventThrottle={16}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  listContainer: {
    marginHorizontal: 8,
    marginTop: 8,
    marginBottom: 84,
  },
  row: {
    margin: 4,
  },
  categoriesItem: {
    marginHorizontal: 4,
    height: Dimensions.get('window').width / 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoriesEmptyContainer: {
    margin: 34,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#cfcf',
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    textAlign: 'center',
    margin: 24,
    color: 'red',
  },
});
