import { ScrollView, StyleSheet } from 'react-native';

import AuthForm from '../components/auth-page/AuthForm';
import AuthHeader from '../components/auth-page/AuthHeader';
import { useStore } from '../store/useStore';
import type { IAuth } from '../types/types';

export default function SignUpPage() {
  const signUp = useStore((state) => state.signUpHandler);

  const signUpSubmitHandler = (newUser: IAuth) => {
    signUp(newUser);
  };

  return (
    <ScrollView style={styles.container}>
      <AuthHeader title="Sign Up" subTitle="Create your account" />
      <AuthForm isSignIn={false} onSubmit={signUpSubmitHandler} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
