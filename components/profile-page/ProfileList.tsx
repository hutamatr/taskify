import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import { shallow } from 'zustand/shallow';

import Text from '../ui/Text';
import { useStore } from '../../store/useStore';

export default function ProfileList() {
  const { signOut, isLoading, userInfo } = useStore(
    (state) => ({
      signOut: state.SignOutHandler,
      isLoading: state.authLoading,
      userInfo: state.userInfo,
    }),
    shallow
  );

  const signOutHandler = () => {
    signOut();
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Text fontType="semibold" variant="titleLarge">
          Name
        </Text>
        <Text fontType="medium" variant="bodyLarge">
          {userInfo?.displayName}
        </Text>
      </View>
      <View style={styles.profileContainer}>
        <Text fontType="semibold" variant="titleLarge">
          Email
        </Text>
        <Text fontType="medium" variant="bodyLarge">
          {userInfo?.email}
        </Text>
      </View>
      <Button mode="outlined" style={styles.button} onPress={signOutHandler} loading={isLoading}>
        <Text fontType="semibold" variant="titleMedium">
          Sign Out
        </Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 24,
    marginHorizontal: 16,
    marginVertical: 24,
  },
  profileContainer: {
    rowGap: 8,
  },
  button: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
  error: {
    textAlign: 'center',
    margin: 24,
    color: 'red',
  },
});
