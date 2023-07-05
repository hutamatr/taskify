import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar } from 'react-native-paper';

import Header from '../ui/Header';
import Text from '../ui/Text';
import { useStore } from '../../store/useStore';
import { getLabelByUsername } from '../../utils/usernameLabel';

export default function ProfileHeader() {
  const userInfo = useStore((state) => state.userInfo);

  const [label] = useState(getLabelByUsername(userInfo?.displayName as string));

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
          {userInfo?.displayName}
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
