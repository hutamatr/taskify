import { View, StyleSheet } from 'react-native';
import { Avatar } from 'react-native-paper';

import Text from '../ui/Text';
import Header from '../ui/Header';

export default function HomeHeader() {
  return (
    <Header>
      <View style={styles.textWelcomeContainer}>
        <Text variant="labelLarge" fontType="medium">
          Hello,
        </Text>
        <Text variant="headlineMedium" numberOfLines={1} lineBreakMode="tail" fontType="medium">
          Hutama Trirahmanto
        </Text>
      </View>
      <Avatar.Image source={{ uri: 'https://picsum.photos/200' }} size={45} />
    </Header>
  );
}

const styles = StyleSheet.create({
  textWelcomeContainer: {
    flex: 3,
  },
  iconsContainer: {
    flex: 1,
    flexDirection: 'row',
    columnGap: 16,
    justifyContent: 'space-around',
  },
  textWelcome: {
    fontSize: 18,
    color: 'black',
  },
  textWelcomeName: {
    fontSize: 22,
    color: 'black',
  },
});
