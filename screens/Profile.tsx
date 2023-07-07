import { StyleSheet, View } from 'react-native';

import ProfileHeader from '../components/profile-screen/ProfileHeader';
import ProfileList from '../components/profile-screen/ProfileList';

export default function Profile() {
  return (
    <View style={styles.container}>
      <ProfileHeader />
      <ProfileList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
