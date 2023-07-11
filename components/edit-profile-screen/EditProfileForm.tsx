import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { shallow } from 'zustand/shallow';

import useInputState from '../../hooks/useInputState';
import useValidation from '../../hooks/useValidation';
import { useStore } from '../../store/useStore';
import type { EditProfileNavigationProp, IUser } from '../../types/types';

interface IEditProfileFormProps {
  profileWantEdit: 'username' | 'email';
}

export default function EditProfileForm({ profileWantEdit }: IEditProfileFormProps) {
  const {
    input: profileInput,
    onChangeInputHandler,
    setInput,
  } = useInputState({
    inputState: { [profileWantEdit]: '' },
  });

  const [passwordCredential, setPasswordCredential] = useState(false);

  const navigation = useNavigation<EditProfileNavigationProp>();

  const { passwordValidation } = useValidation();

  const { userProfile, updateUsername, updateEmail, profileStatus } = useStore(
    (state) => ({
      updateUsername: state.updateProfileHandler,
      updateEmail: state.updateEmailHandler,
      userProfile: state.userProfile,
      profileStatus: state.profileStatus,
      profileError: state.profileError,
    }),
    shallow
  );

  useEffect(() => {
    if (userProfile) {
      setInput((prevState) => ({
        ...prevState,
        [profileWantEdit]: userProfile[profileWantEdit],
      }));
    }
  }, [userProfile, setInput]);

  useEffect(() => {
    const passwordIsValid = passwordValidation.test(profileInput['password']);
    setPasswordCredential(passwordIsValid);
  }, [profileInput['password']]);

  useEffect(() => {
    if (profileStatus === 'successful') {
      navigation.navigate('Profile', {
        snackbarShow: true,
        message:
          profileWantEdit === 'email'
            ? 'updated email successfully'
            : 'updated username successfully',
      });
    }
  }, [profileStatus, navigation]);

  const updateProfileHandler = () => {
    if (userProfile) {
      if (profileInput[profileWantEdit] === userProfile[profileWantEdit]) {
        return;
      }

      if (profileWantEdit === 'username') {
        updateUsername({ displayName: profileInput[profileWantEdit] });
      }

      if (profileWantEdit === 'email' && profileInput['password']) {
        updateEmail(profileInput[profileWantEdit], profileInput['password']);
      }
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        mode="outlined"
        label={profileWantEdit}
        onChangeText={onChangeInputHandler.bind(null, profileWantEdit)}
        value={profileInput[profileWantEdit]}
        autoCapitalize="none"
        keyboardType={profileWantEdit === 'email' ? 'email-address' : 'default'}
        autoComplete={profileWantEdit === 'email' ? 'email' : 'username'}
      />
      {profileWantEdit === 'email' && (
        <TextInput
          mode="outlined"
          label="Password"
          onChangeText={onChangeInputHandler.bind(null, 'password')}
          secureTextEntry={true}
          autoCorrect={false}
          autoCapitalize="none"
          value={profileInput['password']}
        />
      )}
      <Button
        mode="contained"
        onPress={updateProfileHandler}
        loading={profileStatus === 'pending'}
        disabled={
          profileWantEdit === 'username'
            ? profileInput[profileWantEdit] === (userProfile as IUser)[profileWantEdit]
            : !passwordCredential
        }
      >
        Submit
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 24,
    margin: 24,
  },
});
