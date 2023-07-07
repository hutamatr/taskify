import { StyleSheet, View } from 'react-native';

import Header from '../ui/Header';
import Text from '../ui/Text';

export default function CategoriesHeader() {
  return (
    <Header style={styles.headerContainer}>
      <View style={styles.textCategoriesContainer}>
        <Text variant="headlineSmall" numberOfLines={1} lineBreakMode="tail" fontType="regular">
          Categories
        </Text>
      </View>
    </Header>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    paddingTop: 16,
  },
  textCategoriesContainer: {
    flex: 3,
  },
});
