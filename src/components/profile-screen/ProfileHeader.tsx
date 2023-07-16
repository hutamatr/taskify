import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar } from 'react-native-paper';

import Header from '@components/ui/Header';
import Text from '@components/ui/Text';

import { getLabelByUsername } from '@utils/usernameLabel';

interface IProfileHeaderProps {
  username: string;
}

export default function ProfileHeader({ username }: IProfileHeaderProps) {
  const [label] = useState(getLabelByUsername(username));

  return (
    <Header style={styles.headerContainer}>
      <View style={styles.textProfileContainer}>
        <Avatar.Text
          size={100}
          label={
            label.firstLetterAfterSpace
              ? label.firstLetter + label.firstLetterAfterSpace
              : label.firstLetter
          }
        />
        <Text variant="headlineSmall" numberOfLines={1} lineBreakMode="tail" fontType="semibold">
          {username}
        </Text>
      </View>
    </Header>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flex: 0.75,
  },
  textProfileContainer: {
    flex: 3,
    gap: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
