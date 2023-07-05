import auth from '@react-native-firebase/auth';
import { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Button, Dialog, Portal } from 'react-native-paper';

import { usersColRef } from '../api/api';
import AuthForm from '../components/auth-page/AuthForm';
import AuthHeader from '../components/auth-page/AuthHeader';
import Text from '../components/ui/Text';
import type { IAuth } from '../types/types';

export default function SignUpPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({
    errorMessage: '',
    isError: false,
  });

  const showDialog = () => setError((prevState) => ({ ...prevState, isError: true }));
  const hideDialog = () => setError((prevState) => ({ ...prevState, isError: false }));

  const signUpSubmitHandler = async (newUser: IAuth) => {
    setIsLoading(true);
    auth()
      .createUserWithEmailAndPassword(newUser.email, newUser.password)
      .then((user) => {
        user.user.updateProfile({
          displayName: newUser.userName,
        });
        usersColRef.add({
          userId: user.user.uid,
          name: newUser.userName,
          email: newUser.email,
        });
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          setError((prevState) => ({
            ...prevState,
            errorMessage: 'Email address is already in use!',
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
        if (error.code === 'auth/weak-password') {
          setError((prevState) => ({
            ...prevState,
            errorMessage: 'Password must be 8 characters long or more',
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
      <AuthHeader title="Sign Up" subTitle="Create your account" />
      <AuthForm isSignIn={false} onSubmit={signUpSubmitHandler} isLoading={isLoading} />
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
