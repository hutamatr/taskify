import { View, StyleSheet } from 'react-native';

import Text from '../ui/Text';

import Header from '../ui/Header';

export default function CategoriesHeader() {
  return (
    <Header style={styles.headerContainer}>
      <View style={styles.textWelcomeContainer}>
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
  textWelcomeContainer: {
    flex: 3,
  },
});
