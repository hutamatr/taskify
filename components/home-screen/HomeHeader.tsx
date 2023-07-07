import { useNavigation } from '@react-navigation/native';
import { Pressable, StyleSheet, View } from 'react-native';
import { Avatar } from 'react-native-paper';

import Header from '../ui/Header';
import Loading from '../ui/Loading';
import Text from '../ui/Text';
import { HomeNavigationProp, IUser } from '../../types/types';
import { getLabelByUsername } from '../../utils/usernameLabel';

interface IHomeHeaderProps {
  userData: IUser;
  loadingUser: boolean;
}

export default function HomeHeader({ userData, loadingUser }: IHomeHeaderProps) {
  const navigation = useNavigation<HomeNavigationProp>();

  const label = getLabelByUsername(userData?.name);

  const viewProfileHandler = () => {
    navigation.navigate('Profile');
  };

  return (
    <Header style={styles.headerContainer}>
      <View style={styles.textWelcomeContainer}>
        <Text variant="labelLarge" fontType="medium">
          Hello,
        </Text>
        {loadingUser && <Loading size="small" />}
        {!loadingUser && (
          <Text variant="headlineMedium" numberOfLines={1} lineBreakMode="tail" fontType="medium">
            {userData?.name}
          </Text>
        )}
      </View>
      {!loadingUser && (
        <View style={styles.avatarContainer}>
          <Pressable onPress={viewProfileHandler}>
            <Avatar.Text
              size={50}
              label={
                label.firstLetterAfterSpace
                  ? label.firstLetter + label.firstLetterAfterSpace
                  : label.firstLetter
              }
            />
          </Pressable>
        </View>
      )}
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
