import type { FirebaseAuthTypes } from '@react-native-firebase/auth';
import auth from '@react-native-firebase/auth';
import type { StateCreator } from 'zustand';

import { reAuthenticated, usersColRef } from '@api/api';

import type { IProfile, IUser } from 'types/types';

type AuthError = FirebaseAuthTypes.NativeFirebaseAuthError;

export interface IUserProfileSlice {
  userProfile: IUser | undefined;
  profileStatus: 'idle' | 'pending' | 'successful' | 'rejected';
  profileError: { error: AuthError | undefined; errorMessage: string };
  updateEmailHandler: (email: string, currentPassword: string) => void;
  updatePasswordHandler: (currentPassword: string, newPassword: string) => void;
  updateProfileHandler: (profile: IProfile) => void;
  retrieveUserProfileHandler: (user: IUser) => void;
  setProfileStatusHandler: (status: 'idle' | 'pending' | 'successful' | 'rejected') => void;
}

export const userProfileSlice: StateCreator<IUserProfileSlice, [], [], IUserProfileSlice> = (
  set,
  get
) => ({
  userProfile: undefined,
  profileStatus: 'idle',
  profileError: { error: undefined, errorMessage: '' },
  updateEmailHandler: async (email, currentPassword) => {
    set({ profileStatus: 'pending', profileError: undefined });
    try {
      const reAuth = await reAuthenticated(currentPassword);
      await reAuth?.user.updateEmail(email);
      await usersColRef.doc(get().userProfile?.id).update({ email: email });
      set({ profileStatus: 'successful' });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      switch (error.code) {
        case 'auth/wrong-password':
          set({
            profileStatus: 'rejected',
            profileError: { error: error, errorMessage: 'Password is invalid!' },
          });
          break;
        case 'auth/invalid-email':
          set({
            profileStatus: 'rejected',
            profileError: { error: error, errorMessage: 'Email address is invalid!' },
          });
          break;
        case 'auth/user-not-found':
          set({
            profileStatus: 'rejected',
            profileError: { error: error, errorMessage: 'User Not Found!' },
          });
          break;
        default:
          set({
            profileStatus: 'rejected',
            profileError: { error: error, errorMessage: 'Failed sign in account!' },
          });
          break;
      }
    }
  },
  updatePasswordHandler: async (currentPassword, newPassword) => {
    set({ profileStatus: 'pending', profileError: undefined });
    try {
      const reAuth = await reAuthenticated(currentPassword);
      await reAuth?.user.updatePassword(newPassword);
      set({ profileStatus: 'successful' });
    } catch (error) {
      set({
        profileStatus: 'rejected',
        profileError: { error: error as AuthError, errorMessage: 'Failed update password!' },
      });
    }
  },
  updateProfileHandler: async ({ displayName }) => {
    set({ profileStatus: 'pending', profileError: undefined });
    try {
      if (auth().currentUser) {
        await auth().currentUser?.updateProfile({ displayName });
        await usersColRef.doc(get().userProfile?.id).update({ username: displayName });
        set({ profileStatus: 'successful' });
        return true;
      } else {
        throw new Error('No user is logged in');
      }
    } catch (error) {
      set({
        profileStatus: 'rejected',
        profileError: { error: error as AuthError, errorMessage: 'Failed update profile!' },
      });
    }
  },
  retrieveUserProfileHandler: (user) => {
    set({ userProfile: user });
  },
  setProfileStatusHandler: (status) => {
    set({ profileStatus: status });
  },
});
