import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';

import Text from '../ui/Text';
import { useStore } from '../../store/useStore';

export default function ProfileList() {
  const signOut = useStore((state) => state.SignOutHandler);

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
          Hutama Trirahmanto
        </Text>
      </View>
      <View style={styles.profileContainer}>
        <Text fontType="semibold" variant="titleLarge">
          Email
        </Text>
        <Text fontType="medium" variant="bodyLarge">
          hutamatr@gmail.com
        </Text>
      </View>
      <Button mode="outlined" style={styles.button} onPress={signOutHandler}>
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
});
