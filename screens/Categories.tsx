import BottomSheet from '@gorhom/bottom-sheet';
import { useCollection } from '@skillnation/react-native-firebase-hooks/firestore';
import { useCallback, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { AnimatedFAB } from 'react-native-paper';

import { queryCategories } from '../api/api';
import CategoriesHeader from '../components/categories-screen/CategoriesHeader';
import CategoriesList from '../components/categories-screen/CategoriesList';
import CategoriesForm from '../components/createcategories-screen/CategoriesForm';
import useFormatData from '../hooks/useFormatData';
import useHandleScroll from '../hooks/useHandleScroll';
import { useStore } from '../store/useStore';
import { ICategories } from '../types/types';

export default function Categories() {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const userInfo = useStore((state) => state.userInfo);

  const [categories, categoriesIsLoading, categoriesError] = useCollection(
    queryCategories(userInfo?.uid as string)
  );

  const categoriesData = useFormatData<ICategories[]>(categories);

  const createNewCategoriesHandler = useCallback((index: number) => {
    bottomSheetRef.current?.snapToIndex(index);
  }, []);

  const { handleScroll, showButton } = useHandleScroll();

  return (
    <View style={styles.container}>
      <CategoriesHeader />
      <CategoriesList
        onScroll={handleScroll}
        categories={categoriesData}
        isLoading={categoriesIsLoading}
        error={categoriesError}
      />
      <CategoriesForm bottomSheetRef={bottomSheetRef} />
      <AnimatedFAB
        icon="plus"
        variant="tertiary"
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
