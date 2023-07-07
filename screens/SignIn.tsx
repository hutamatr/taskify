import { ScrollView, StyleSheet } from 'react-native';
import { Button, Dialog, Portal } from 'react-native-paper';

import AuthForm from '../components/auth/AuthForm';
import AuthHeader from '../components/auth/AuthHeader';
import Text from '../components/ui/Text';
import { useStore } from '../store/useStore';
import type { IAuth } from '../types/types';

export default function SignIn() {
  const { signIn, authStatus, authError, setStatus } = useStore((state) => ({
    signIn: state.signInHandler,
    authStatus: state.authStatus,
    authError: state.authError,
    setStatus: state.setStatusHandler,
  }));

  const hideDialog = () => setStatus();

  const signInSubmitHandler = (user: IAuth) => {
    signIn(user);
  };

  return (
    <ScrollView style={styles.container}>
      <AuthHeader title="Sign In" subTitle="Sign in to your account" />
      <AuthForm
        isSignIn={true}
        onSubmit={signInSubmitHandler}
        isLoading={authStatus === 'pending'}
      />
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
