import { StyleSheet, View } from 'react-native';
import { Button, Dialog, Portal } from 'react-native-paper';
import { shallow } from 'zustand/shallow';

import Text from '../ui/Text';
import { useStore } from '../../store/useStore';

export default function ProfileList() {
  const { signOut, authStatus, authError, setStatus, userInfo } = useStore(
    (state) => ({
      signOut: state.SignOutHandler,
      authStatus: state.authStatus,
      authError: state.authError,
      setStatus: state.setStatusHandler,
      userInfo: state.userInfo,
    }),
    shallow
  );

  const hideDialog = () => setStatus();

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
      <Button
        mode="outlined"
        style={styles.button}
        onPress={signOutHandler}
        loading={authStatus === 'pending'}
      >
        <Text fontType="semibold" variant="titleMedium">
          Sign Out
        </Text>
      </Button>
      <Portal>
        <Dialog visible={authStatus === 'rejected'} onDismiss={hideDialog}>
          <Dialog.Title>Sign Up Failed!</Dialog.Title>
          <Dialog.Content>
            <Text fontType="medium" variant="bodyMedium">
              {authError.errorMessage}
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Ok</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
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
