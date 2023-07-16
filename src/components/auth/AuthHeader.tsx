import { StyleSheet, View } from 'react-native';

import Header from '@components/ui/Header';
import Text from '@components/ui/Text';

interface IAuthHeader {
  title: string;
  subTitle: string;
}

export default function AuthHeader({ title, subTitle }: IAuthHeader) {
  return (
    <Header style={styles.headerContainer}>
      <View style={styles.textAuthContainer}>
        <Text variant="displayLarge" numberOfLines={1} lineBreakMode="tail" fontType="regular">
          {title}
        </Text>
        <Text variant="titleMedium" numberOfLines={1} lineBreakMode="tail" fontType="medium">
          {subTitle}
        </Text>
      </View>
    </Header>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    paddingTop: 64,
  },
  textAuthContainer: {
    rowGap: 8,
  },
});
