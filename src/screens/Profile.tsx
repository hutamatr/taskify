import { useRoute } from '@react-navigation/native';
import { useCollection } from '@skillnation/react-native-firebase-hooks/firestore';
import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Snackbar } from 'react-native-paper';
import { shallow } from 'zustand/shallow';

import ProfileHeader from '@components/profile-screen/ProfileHeader';
import ProfileList from '@components/profile-screen/ProfileList';
import Loading from '@components/ui/Loading';
import Text from '@components/ui/Text';

import { useStore } from '@store/useStore';
import { queryUser } from '@api/api';

import useFormatData from '@hooks/useFormatData';
import useSnackbar from '@hooks/useSnackbar';

import type { IUser, ProfileScreenRouteProp } from 'types/types';

export default function Profile() {
  const { authInfo, setProfileStatus } = useStore(
    (state) => ({ authInfo: state.authInfo, setProfileStatus: state.setProfileStatusHandler }),
    shallow
  );

  const route = useRoute<ProfileScreenRouteProp>();
  const { visible, setVisible, onDismissSnackBar } = useSnackbar();

  const [user, userLoading, userError] = useCollection(queryUser(authInfo?.uid as string));
  const userData = useFormatData<IUser[]>(user)[0];

  useEffect(() => {
    if (route.params?.snackbarShow) {
      setVisible(route.params.snackbarShow);
    }
  }, [route.params]);

  const onDismissSnackBarHandler = () => {
    onDismissSnackBar();
    setProfileStatus('idle');
  };

  return (
    <View style={styles.container}>
      {userLoading && <Loading size="large" />}
      {userError && (
        <Text fontType="medium" style={styles.error} variant="headlineSmall">
          Failed view profile!
        </Text>
      )}
      {!userLoading && !userError && userData && (
        <>
          <ProfileHeader username={userData.username} />
          <ProfileList username={userData.username} email={userData.email} />
        </>
      )}
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBarHandler}
        duration={5000}
        action={{
          label: 'Ok',
          onPress: () => {
            onDismissSnackBarHandler();
          },
        }}
      >
        {route.params?.message}
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  error: {
    textAlign: 'center',
    margin: 24,
    color: 'red',
  },
});
