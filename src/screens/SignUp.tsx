import { ScrollView, StyleSheet } from 'react-native';

import AuthForm from '@components/auth/AuthForm';
import AuthHeader from '@components/auth/AuthHeader';
import DialogView from '@components/ui/DialogView';

import { useStore } from '@store/useStore';

import type { IAuth } from 'types/types';

export default function SignUp() {
  const { signUp, authStatus, authError, setAuthStatus } = useStore((state) => ({
    signUp: state.signUpHandler,
    authStatus: state.authStatus,
    authError: state.authError,
    setAuthStatus: state.setAuthStatusHandler,
  }));

  const hideDialog = () => setAuthStatus('idle');

  const signUpSubmitHandler = (newUser: IAuth) => {
    signUp(newUser);
  };

  return (
    <ScrollView style={styles.container}>
      <AuthHeader title="Sign Up" subTitle="Create your account" />
      <AuthForm
        isSignIn={false}
        onSubmit={signUpSubmitHandler}
        isLoading={authStatus === 'pending'}
      />
      <DialogView
        dialogTitle="Sign up failed!"
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
