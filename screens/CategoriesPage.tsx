import { View, StyleSheet } from 'react-native';
import { AnimatedFAB } from 'react-native-paper';

import CategoriesHeader from '../components/categories-page/CategoriesHeader';
import CategoriesList from '../components/categories-page/CategoriesList';
import useHandleScroll from '../hooks/useHandleScroll';

export default function CategoriesPage() {
  const { handleScroll, showButton } = useHandleScroll();

  return (
    <View style={styles.container}>
      <CategoriesHeader />
      <CategoriesList onScroll={handleScroll} />
      <AnimatedFAB
        icon="plus"
        variant="tertiary"
        label="Add Category"
        extended={showButton}
        onPress={() => console.log('Pressed')}
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
