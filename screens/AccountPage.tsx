import { View, StyleSheet } from 'react-native';

import AccountHeader from '../components/account-page/AccountHeader';

export default function AccountPage() {
  return (
    <View style={styles.container}>
      <AccountHeader />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
