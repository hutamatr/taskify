import { useRoute } from '@react-navigation/native';
import { useCollection } from '@skillnation/react-native-firebase-hooks/firestore';
import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Snackbar } from 'react-native-paper';

import { queryUser } from '../api/api';
import ProfileHeader from '../components/profile-screen/ProfileHeader';
import ProfileList from '../components/profile-screen/ProfileList';
import Loading from '../components/ui/Loading';
import useFormatData from '../hooks/useFormatData';
import useSnackbar from '../hooks/useSnackbar';
import { useStore } from '../store/useStore';
import type { ProfileScreenRouteProp } from '../types/types';
import { IUser } from '../types/types';

export default function Profile() {
  const authInfo = useStore((state) => state.authInfo);

  const route = useRoute<ProfileScreenRouteProp>();
  const { visible, setVisible, onDismissSnackBar } = useSnackbar();

  const [user, userLoading, _userError] = useCollection(queryUser(authInfo?.uid as string));
  const userData = useFormatData<IUser[]>(user)[0];

  useEffect(() => {
    if (route.params?.snackbarShow) {
      setVisible(route.params.snackbarShow);
    }
  }, [route.params]);

  return (
    <View style={styles.container}>
      {userLoading && <Loading size="large" />}
      {!userLoading && userData && (
        <>
          <ProfileHeader username={userData.username} />
          <ProfileList username={userData.username} email={userData.email} />
        </>
      )}
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        duration={5000}
        action={{
          label: 'Ok',
          onPress: () => {
            onDismissSnackBar();
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
});
