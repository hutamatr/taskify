import { View, StyleSheet } from 'react-native';
import { AnimatedFAB } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import CategoriesHeader from '../components/categories-page/CategoriesHeader';
import CategoriesList from '../components/categories-page/CategoriesList';
import useHandleScroll from '../hooks/useHandleScroll';

import { CategoriesNavigationProp } from '../types/types';

export default function CategoriesPage() {
  const { handleScroll, showButton } = useHandleScroll();

  const navigation = useNavigation<CategoriesNavigationProp>();

  const createNewCategoriesHandler = () => {
    navigation.navigate('CreateCategories');
  };

  return (
    <View style={styles.container}>
      <CategoriesHeader />
      <CategoriesList onScroll={handleScroll} />
      <AnimatedFAB
        icon="plus"
        variant="tertiary"
        label="Add Category"
        extended={showButton}
        onPress={createNewCategoriesHandler}
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
