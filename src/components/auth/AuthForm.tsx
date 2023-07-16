import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, HelperText, TextInput } from 'react-native-paper';

import Text from '@components/ui/Text';

import useInputState from '@hooks/useInputState';
import useValidation from '@hooks/useValidation';

import type { IAuth, SignInScreenNavigationProp } from 'types/types';

interface IAuthForm {
  isSignIn: boolean;
  isLoading: boolean;
  onSubmit: (authData: IAuth) => void;
}

export default function AuthForm({ isSignIn, isLoading, onSubmit }: IAuthForm) {
  const [isPasswordView, setIsPasswordView] = useState(false);
  const {
    input: userInput,
    setInput: setUserInput,
    onChangeInputHandler: userInputHandler,
  } = useInputState({
    inputState: { username: '', email: '', password: '', confirmPassword: '' },
  });
  const { username, email, password, confirmPassword } = userInput;

  const { input: credentialsForm, setInput: setCredentialsForm } = useInputState({
    inputState: { username: false, email: false, password: false, confirmPassword: false },
  });

  const { usernameValidation, emailValidation, passwordValidation } = useValidation();
  const navigation = useNavigation<SignInScreenNavigationProp>();

  useEffect(() => {
    const usernameIsValid = usernameValidation.test(username);
    const emailIsValid = emailValidation.test(email);
    const passwordIsValid = passwordValidation.test(password);
    const passwordsAreEqual = passwordIsValid ? password === confirmPassword : false;

    setCredentialsForm((prevState) => ({
      ...prevState,
      username: usernameIsValid,
      email: emailIsValid,
      password: passwordIsValid,
      confirmPassword: passwordsAreEqual,
    }));
  }, [username, email, password, confirmPassword]);

  const passwordViewHandler = () => {
    setIsPasswordView((prevState) => !prevState);
  };

  const changeAuthPageHandler = () => {
    if (isSignIn) {
      navigation.replace('SignUp');
    } else {
      navigation.replace('SignIn');
    }
  };

  const formSubmitHandler = () => {
    if (!isSignIn) {
      if (
        !credentialsForm.username ||
        !credentialsForm.email ||
        !credentialsForm.password ||
        !credentialsForm.confirmPassword
      ) {
        return;
      }

      const newUser = {
        username,
        email,
        password,
      };

      onSubmit(newUser);
    } else {
      if (!credentialsForm.email || !credentialsForm.password) {
        return;
      }

      const user = {
        email,
        password,
      };

      onSubmit(user);
    }

    if (!isLoading) {
      setUserInput({ username: '', email: '', password: '', confirmPassword: '' });
    }
  };

  return (
    <View style={[styles.formRootContainer]}>
      <View style={styles.formContainer}>
        {!isSignIn && (
          <TextInput
            mode="outlined"
            label="username"
            onChangeText={userInputHandler.bind(null, 'username')}
            autoCapitalize="none"
            value={username}
            error={credentialsForm.username && username ? false : !!username}
          />
        )}

        <TextInput
          mode="outlined"
          label="Email"
          onChangeText={userInputHandler.bind(null, 'email')}
          keyboardType="email-address"
          autoComplete="email"
          autoCapitalize="none"
          importantForAutofill="yes"
          value={email}
          error={credentialsForm.email && email ? false : !!email}
        />
        <View>
          <TextInput
            mode="outlined"
            label="Password"
            onChangeText={userInputHandler.bind(null, 'password')}
            secureTextEntry={!isPasswordView}
            autoCorrect={false}
            autoCapitalize="none"
            importantForAutofill="yes"
            value={password}
            error={credentialsForm.password && password ? false : !!password}
            right={
              <TextInput.Icon
                icon={!isPasswordView ? 'eye' : 'eye-off'}
                onPress={passwordViewHandler}
              />
            }
          />
          <HelperText type="info" visible={true}>
            <Text fontType="regular">Minimum of 8 characters, a-z, A-Z, 0-9.</Text>
          </HelperText>
        </View>
        {!isSignIn && (
          <TextInput
            mode="outlined"
            label="Confirm Password"
            onChangeText={userInputHandler.bind(null, 'confirmPassword')}
            secureTextEntry={!isPasswordView}
            autoCorrect={false}
            autoCapitalize="none"
            value={confirmPassword}
            error={credentialsForm.confirmPassword && confirmPassword ? false : !!confirmPassword}
          />
        )}
      </View>
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          style={{ paddingVertical: 4 }}
          onPress={formSubmitHandler}
          loading={isLoading}
          disabled={
            isSignIn
              ? !credentialsForm.email || !credentialsForm.password
              : !credentialsForm.username ||
                !credentialsForm.email ||
                !credentialsForm.password ||
                !credentialsForm.confirmPassword
          }
        >
          {isSignIn ? 'Sign In' : 'Sign Up'}
        </Button>
        <Button mode="text" onPress={changeAuthPageHandler}>
          {isSignIn ? "Don't have an account? Sign Up" : 'I have an account?, Sign in'}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  formRootContainer: {
    flex: 1,
    marginHorizontal: 16,
    marginVertical: 28,
    rowGap: 34,
  },
  formContainer: {
    rowGap: 8,
  },
  buttonContainer: {
    rowGap: 8,
  },
});
