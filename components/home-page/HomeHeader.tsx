import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar } from 'react-native-paper';

import Header from '../ui/Header';
import Text from '../ui/Text';
import { getLabelByUsername } from '../../utils/usernameLabel';

const username = 'hutama trirahmanto';

export default function HomeHeader() {
  const [label] = useState(getLabelByUsername(username));

  return (
    <Header style={styles.headerContainer}>
      <View style={styles.textWelcomeContainer}>
        <Text variant="labelLarge" fontType="medium">
          Hello,
        </Text>
        <Text variant="headlineMedium" numberOfLines={1} lineBreakMode="tail" fontType="medium">
          {username}
        </Text>
      </View>
      <View style={styles.avatarContainer}>
        <Avatar.Text
          size={50}
          label={
            label.firstLetterAfterSpace
              ? label.firstLetter + label.firstLetterAfterSpace
              : label.firstLetter
          }
        />
      </View>
    </Header>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    paddingTop: 100,
    flexDirection: 'column-reverse',
  },
  textWelcomeContainer: {
    alignItems: 'flex-start',
    width: '100%',
  },
  avatarContainer: {
    alignItems: 'flex-end',
    width: '100%',
  },
});
