import { StyleSheet, View } from 'react-native';

import ProfileHeader from '../components/profile-page/ProfileHeader';
import ProfileList from '../components/profile-page/ProfileList';

export default function ProfilePage() {
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
