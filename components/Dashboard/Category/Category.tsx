import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';

import CategoryCard from './CategoryCard';

export default function Category() {
  return (
    <View style={styles.categoryContainer}>
      <View style={styles.titleCategoryContainer}>
        <Text variant="headlineSmall">Your Category</Text>
        <Button mode="text">See all</Button>
      </View>
      <View style={styles.cardCategoryContainer}>
        <CategoryCard />
        <CategoryCard />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  categoryContainer: {
    marginHorizontal: 16,
  },
  titleCategoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  cardCategoryContainer: {
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    columnGap: 8,
    marginVertical: 8,
  },
});
