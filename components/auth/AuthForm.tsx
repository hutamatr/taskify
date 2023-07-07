import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, HelperText, TextInput } from 'react-native-paper';

import Text from '../ui/Text';
import useInputState from '../../hooks/useInputState';
import useValidation from '../../hooks/useValidation';
import type { IAuth, SignInScreenNavigationProp } from '../../types/types';

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
    inputState: { userName: '', email: '', password: '', confirmPassword: '' },
  });
  const { userName, email, password, confirmPassword } = userInput;

  const { input: credentialsForm, setInput: setCredentialsForm } = useInputState({
    inputState: { userName: false, email: false, password: false, confirmPassword: false },
  });

  const { userNameValidation, emailValidation, passwordValidation } = useValidation();
  const navigation = useNavigation<SignInScreenNavigationProp>();

  useEffect(() => {
    const userNameIsValid = userNameValidation.test(userName);
    const emailIsValid = emailValidation.test(email);
    const passwordIsValid = passwordValidation.test(password);
    const passwordsAreEqual = passwordIsValid ? password === confirmPassword : false;

    setCredentialsForm((prevState) => ({
      ...prevState,
      userName: userNameIsValid,
      email: emailIsValid,
      password: passwordIsValid,
      confirmPassword: passwordsAreEqual,
    }));
  }, [userName, email, password, confirmPassword]);

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
        !credentialsForm.userName ||
        !credentialsForm.email ||
        !credentialsForm.password ||
        !credentialsForm.confirmPassword
      ) {
        return;
      }

      const newUser = {
        userName,
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
      setUserInput({ userName: '', email: '', password: '', confirmPassword: '' });
    }
  };

  return (
    <View style={styles.formRootContainer}>
      <View style={styles.formContainer}>
        {!isSignIn && (
          <TextInput
            mode="outlined"
            label="Username"
            onChangeText={userInputHandler.bind(null, 'userName')}
            autoCapitalize="none"
            value={userName}
            error={credentialsForm.userName && userName ? false : !!userName}
          />
        )}

        <TextInput
          mode="outlined"
          label="Email"
          onChangeText={userInputHandler.bind(null, 'email')}
          keyboardType="email-address"
          autoComplete="email"
          autoCapitalize="none"
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
              : !credentialsForm.userName ||
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
    rowGap: 24,
  },
  buttonContainer: {
    rowGap: 8,
  },
});
