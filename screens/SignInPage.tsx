import { ScrollView, StyleSheet } from 'react-native';

import AuthForm from '../components/auth-page/AuthForm';
import AuthHeader from '../components/auth-page/AuthHeader';
import { useStore } from '../store/useStore';
import type { IAuth } from '../types/types';

export default function SignInPage() {
  const signIn = useStore((state) => state.signInHandler);

  const signInSubmitHandler = (user: IAuth) => {
    signIn(user);
  };

  return (
    <ScrollView style={styles.container}>
      <AuthHeader title="Sign In" subTitle="Sign in to your account" />
      <AuthForm isSignIn={true} onSubmit={signInSubmitHandler} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
