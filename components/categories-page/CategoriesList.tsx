import { FlatList, NativeScrollEvent, NativeSyntheticEvent, StyleSheet } from 'react-native';

import CategoriesItem from './CategoriesItem';
import { DUMMY_CATEGORIES } from '../../utils/dummy';

interface ICategoriesListProps {
  onScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
}

export default function CategoriesList({ onScroll }: ICategoriesListProps) {
  return (
    <FlatList
      data={DUMMY_CATEGORIES}
      renderItem={({ item }) => (
        <CategoriesItem {...item} style={styles.categoriesItem} textVariant="titleLarge" />
      )}
      keyExtractor={(item) => item.id as string}
      numColumns={2}
      contentContainerStyle={styles.container}
      columnWrapperStyle={styles.row}
      style={styles.list}
      onScroll={onScroll}
      scrollEventThrottle={16}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  row: {
    flex: 1,
    margin: 4,
    justifyContent: 'space-evenly',
  },
  list: {
    flex: 1,
    marginHorizontal: 8,
    marginVertical: 16,
  },
  categoriesItem: {
    marginHorizontal: 4,
  },
});
