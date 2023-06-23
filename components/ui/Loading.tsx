import { ActivityIndicator, ActivityIndicatorProps, StyleSheet, View } from 'react-native';

export default function Loading({ ...props }: ActivityIndicatorProps) {
  return (
    <View style={styles.container}>
      <ActivityIndicator {...props} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    margin: 24,
  },
});
