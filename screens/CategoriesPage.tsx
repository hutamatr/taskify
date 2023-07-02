import BottomSheet from '@gorhom/bottom-sheet';
import { useCallback, useEffect, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { AnimatedFAB } from 'react-native-paper';

import CategoriesHeader from '../components/categories-page/CategoriesHeader';
import CategoriesList from '../components/categories-page/CategoriesList';
import CategoriesForm from '../components/createcategories-page/CategoriesForm';
import useHandleScroll from '../hooks/useHandleScroll';
import { useStore } from '../store/useStore';

export default function CategoriesPage() {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const createNewCategoriesHandler = useCallback((index: number) => {
    bottomSheetRef.current?.snapToIndex(index);
  }, []);

  const { handleScroll, showButton } = useHandleScroll();

  const { fetchAllCategories, userInfo } = useStore((state) => ({
    fetchAllCategories: state.fetchAllCategoriesHandler,
    userInfo: state.userInfo,
  }));

  console.log('Categories Page', { userInfo });

  useEffect(() => {
    fetchAllCategories(userInfo?.uid as string);
  }, []);

  return (
    <View style={styles.container}>
      <CategoriesHeader />
      <CategoriesList onScroll={handleScroll} />
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
