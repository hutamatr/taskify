import BottomSheet from '@gorhom/bottom-sheet';
import { useCallback, useMemo, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { AnimatedFAB } from 'react-native-paper';
import { shallow } from 'zustand/shallow';

import CategoriesHeader from '@components/categories-screen/CategoriesHeader';
import CategoriesList from '@components/categories-screen/CategoriesList';
import CategoriesForm from '@components/createcategories-screen/CategoriesForm';

import { useStore } from '@store/useStore';

import useHandleScroll from '@hooks/useHandleScroll';

export default function Categories() {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const { categories, categoriesStatus, categoriesError } = useStore(
    (state) => ({
      categories: state.categories,
      categoriesStatus: state.categoriesStatus,
      categoriesError: state.categoriesError,
    }),
    shallow
  );

  const { handleScroll, showButton } = useHandleScroll();

  // const [categories, categoriesIsLoading, categoriesError] = useCollection(
  //   queryCategories(authInfo?.uid as string)
  // );

  // const categoriesData = useFormatData<ICategories[]>(categories);

  const categoriesSort = useMemo(() => {
    const categoriesSorted = categories.sort(
      (a, b) => +new Date(a.createdAt as string) - +new Date(b.createdAt as string)
    );
    return categoriesSorted;
  }, [categories]);

  const createNewCategoriesHandler = useCallback((index: number) => {
    bottomSheetRef.current?.snapToIndex(index);
  }, []);

  return (
    <View style={styles.container}>
      <CategoriesHeader />
      <CategoriesList
        onScroll={handleScroll}
        categories={categoriesSort}
        isLoading={categoriesStatus === 'pending'}
        error={categoriesError?.error}
      />
      <CategoriesForm bottomSheetRef={bottomSheetRef} />
      <AnimatedFAB
        icon="plus"
        variant="surface"
        label="Add Category"
        extended={showButton}
        onPress={createNewCategoriesHandler.bind(null, 0)}
        visible={true}
        animateFrom="right"
        iconMode="dynamic"
        style={styles.fab}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fab: {
    position: 'absolute',
    bottom: 16,
    right: 16,
  },
});
