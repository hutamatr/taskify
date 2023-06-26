import { useNavigation } from '@react-navigation/native';
import {
  Dimensions,
  FlatList,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
  StyleSheet,
  View,
} from 'react-native';
import { shallow } from 'zustand/shallow';

import CategoriesItem from './CategoriesItem';
import Loading from '../ui/Loading';
import Text from '../ui/Text';
import { useStore } from '../../store/useStore';
import type { CategoriesNavigationProp, ICategories } from '../../types/types';
import { formatData } from '../../utils/formatDataList';

interface ICategoriesListProps {
  onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
}

const numColumns = 2;

export default function CategoriesList({ onScroll }: ICategoriesListProps) {
  const { categories, isLoading, error } = useStore(
    (state) => ({ categories: state.categories, isLoading: state.isLoading, error: state.error }),
    shallow
  );

  const navigation = useNavigation<CategoriesNavigationProp>();

  const viewCategoriesDetailHandler = (category: ICategories) => {
    navigation.navigate('CategoriesDetail', { ...category });
  };

  return (
    <View style={styles.listContainer}>
      {isLoading && <Loading size="large" />}
      {error?.isError && (
        <Text fontType="medium" style={styles.error} variant="headlineSmall">
          {error.errorMessage}
        </Text>
      )}
      {!isLoading && !error.isError && categories.length === 0 && (
        <View style={styles.categoriesEmptyContainer}>
          <Text fontType="medium" variant="headlineSmall">
            Categories Empty
          </Text>
        </View>
      )}
      {!isLoading && !error.isError && categories.length > 0 && (
        <FlatList
          data={formatData(categories, numColumns)}
          renderItem={({ item }) => {
            if (!item.id) {
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
                mode="contained"
                style={styles.categoriesItem}
                textVariant="titleLarge"
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
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 150,
  },
  row: {
    margin: 4,
  },
  categoriesItem: {
    marginHorizontal: 4,
    height: Dimensions.get('window').width / 4,
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
