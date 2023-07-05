import auth from '@react-native-firebase/auth';
import { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Button, Dialog, Portal } from 'react-native-paper';

import AuthForm from '../components/auth-page/AuthForm';
import AuthHeader from '../components/auth-page/AuthHeader';
import Text from '../components/ui/Text';
import type { IAuth } from '../types/types';

export default function SignInPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({
    errorMessage: '',
    isError: false,
  });

  const showDialog = () => setError((prevState) => ({ ...prevState, isError: true }));
  const hideDialog = () => setError((prevState) => ({ ...prevState, isError: false }));

  const signInSubmitHandler = (user: IAuth) => {
    auth()
      .signInWithEmailAndPassword(user.email, user.password)
      .then(() => {
        //
      })
      .catch((error) => {
        if (error.code === 'auth/wrong-password') {
          setError((prevState) => ({
            ...prevState,
            errorMessage: 'Password is invalid!',
          }));
          showDialog();
        }
        if (error.code === 'auth/invalid-email') {
          setError((prevState) => ({
            ...prevState,
            errorMessage: 'Email address is invalid!',
          }));
          showDialog();
        }
        if (error.code === 'auth/user-not-found') {
          setError((prevState) => ({
            ...prevState,
            errorMessage: 'User Not Found!',
          }));
          showDialog();
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <ScrollView style={styles.container}>
      <AuthHeader title="Sign In" subTitle="Sign in to your account" />
      <AuthForm isSignIn={true} onSubmit={signInSubmitHandler} isLoading={isLoading} />
      <Portal>
        <Dialog visible={error.isError} onDismiss={hideDialog}>
          <Dialog.Title>Sign Up Failed!</Dialog.Title>
          <Dialog.Content>
            <Text fontType="medium" variant="bodyMedium">
              {error.errorMessage}
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
