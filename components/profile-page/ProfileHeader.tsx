import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar } from 'react-native-paper';

import Header from '../ui/Header';
import Text from '../ui/Text';
import { getLabelByUsername } from '../../utils/usernameLabel';

const username = 'Hutama Trirahmanto';

export default function ProfileHeader() {
  const [label] = useState(getLabelByUsername(username));

  return (
    <Header style={styles.headerContainer}>
      <View style={styles.textProfileContainer}>
        <Avatar.Text size={100} label={label?.firstLetter + label?.firstLetterAfterSpace} />
        <Text variant="headlineSmall" numberOfLines={1} lineBreakMode="tail" fontType="semibold">
          {username}
        </Text>
      </View>
    </Header>
  );
}

const styles = StyleSheet.create({
  textProfileContainer: {
    flex: 3,
    gap: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    flex: 0.75,
  },
});
