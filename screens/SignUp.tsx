import { ScrollView, StyleSheet } from 'react-native';
import { Button, Dialog, Portal } from 'react-native-paper';

import AuthForm from '../components/auth/AuthForm';
import AuthHeader from '../components/auth/AuthHeader';
import Text from '../components/ui/Text';
import { useStore } from '../store/useStore';
import type { IAuth } from '../types/types';

export default function SignUp() {
  const { signUp, authStatus, authError, setStatus } = useStore((state) => ({
    signUp: state.signUpHandler,
    authStatus: state.authStatus,
    authError: state.authError,
    setStatus: state.setStatusHandler,
  }));

  const hideDialog = () => setStatus();

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
