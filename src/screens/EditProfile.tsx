import { useNavigation, useRoute } from '@react-navigation/native';
import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import EditProfileForm from '@components/edit-profile-screen/EditProfileForm';

import type { EditProfileNavigationProp, EditProfileScreenRouteProp } from 'types/types';

export default function EditProfile() {
  const navigation = useNavigation<EditProfileNavigationProp>();
  const route = useRoute<EditProfileScreenRouteProp>();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: route.params.profileWantUpdate,
    });
  }, [navigation, route.params]);

  return (
    <View style={styles.container}>
      <EditProfileForm
        profileWantEdit={route.params.profileWantUpdate === 'email' ? 'email' : 'username'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
