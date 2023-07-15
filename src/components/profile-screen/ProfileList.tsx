import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Pressable, StyleSheet, View } from 'react-native';
import { Button, Dialog, Portal } from 'react-native-paper';
import { shallow } from 'zustand/shallow';

import Text from '@components/ui/Text';

import { useStore } from '@store/useStore';

import type { ProfileNavigationProp } from 'types/types';

interface IProfileListProps {
  username: string;
  email: string;
}

export default function ProfileList({ email, username }: IProfileListProps) {
  const { signOut, authStatus, authError, setProfileStatus } = useStore(
    (state) => ({
      signOut: state.SignOutHandler,
      authStatus: state.authStatus,
      authError: state.authError,
      setProfileStatus: state.setProfileStatusHandler,
    }),
    shallow
  );

  const navigation = useNavigation<ProfileNavigationProp>();

  const profileData = [
    {
      id: '01',
      field: 'Username',
      value: username,
    },
    {
      id: '02',
      field: 'Email',
      value: email,
    },
  ];

  const editProfileHandler = (profileWantEdit: string) => {
    navigation.navigate('EditProfile', { profileWantUpdate: profileWantEdit });
  };

  const hideDialog = () => setProfileStatus('idle');

  const signOutHandler = () => {
    signOut();
  };

  return (
    <View style={styles.container}>
      {profileData.map(({ id, field, value }) => {
        return (
          <Pressable key={id} onPress={editProfileHandler.bind(null, field.toLowerCase())}>
            <View style={styles.profileContainer}>
              <View style={styles.profileChildContainer}>
                <Text fontType="semibold" variant="titleMedium" style={styles.textField}>
                  {field}
                </Text>
                <Text fontType="medium" variant="bodyLarge" style={styles.textProfile}>
                  {value}
                </Text>
              </View>
              <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
            </View>
          </Pressable>
        );
      })}
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
    margin: 24,
  },
  profileContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileChildContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textProfile: {
    flex: 2,
  },
  textField: {
    flex: 1,
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
