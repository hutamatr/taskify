import { View, StyleSheet } from 'react-native';

import Text from '../ui/Text';
import Header from '../ui/Header';

export default function AccountHeader() {
  return (
    <Header style={styles.headerContainer}>
      <View style={styles.textAccountContainer}>
        <Text variant="headlineSmall" numberOfLines={1} lineBreakMode="tail" fontType="regular">
          Account
        </Text>
      </View>
    </Header>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    paddingTop: 16,
  },
  textAccountContainer: {
    flex: 3,
  },
});
