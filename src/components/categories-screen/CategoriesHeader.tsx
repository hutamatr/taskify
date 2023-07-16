import { StyleSheet, View } from 'react-native';

import Header from '@components/ui/Header';
import Text from '@components/ui/Text';

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
    paddingTop: 8,
  },
  textCategoriesContainer: {
    flex: 3,
  },
});
