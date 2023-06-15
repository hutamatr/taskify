import { View, StyleSheet } from 'react-native';
import { Text, Avatar, useTheme } from 'react-native-paper';

export default function Header() {
  const theme = useTheme();

  return (
    <View style={[styles.dashHeaderContainer, { backgroundColor: theme.colors.inversePrimary }]}>
      <View style={styles.textWelcomeContainer}>
        <Text variant="labelLarge">Hello,</Text>
        <Text variant="headlineSmall">Hutama Trirahmanto</Text>
      </View>
      <Avatar.Image source={{ uri: 'https://picsum.photos/200' }} size={45} />
    </View>
  );
}

const styles = StyleSheet.create({
  dashHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 34,
  },
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
