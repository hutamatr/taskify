import { ScrollView, StyleSheet } from 'react-native';

import AuthForm from '@components/auth/AuthForm';
import AuthHeader from '@components/auth/AuthHeader';
import DialogView from '@components/ui/DialogView';

import { useStore } from '@store/useStore';

import type { IAuth } from 'types/types';

export default function SignIn() {
  const { signIn, authStatus, authError, setStatus } = useStore((state) => ({
    signIn: state.signInHandler,
    authStatus: state.authStatus,
    authError: state.authError,
    setStatus: state.setAuthStatusHandler,
  }));

  const hideDialog = () => setStatus('idle');

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
      <DialogView
        dialogTitle="Sign in failed!"
        message={authError?.errorMessage}
        visible={authStatus === 'rejected'}
        onDismiss={hideDialog}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
