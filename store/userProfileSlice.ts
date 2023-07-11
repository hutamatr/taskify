import type { FirebaseAuthTypes } from '@react-native-firebase/auth';
import auth from '@react-native-firebase/auth';
import type { StateCreator } from 'zustand';

import { reAuthenticated, usersColRef } from '../api/api';
import type { IProfile, IUser } from '../types/types';

type AuthError = FirebaseAuthTypes.NativeFirebaseAuthError;

export interface IUserProfileSlice {
  userProfile: IUser | undefined;
  profileStatus: 'idle' | 'pending' | 'successful' | 'rejected';
  profileError: AuthError | undefined;
  updateEmailHandler: (email: string, currentPassword: string) => void;
  updatePasswordHandler: (currentPassword: string, newPassword: string) => void;
  updateProfileHandler: (profile: IProfile) => void;
  retrieveUserProfileHandler: (user: IUser) => void;
}

export const userProfileSlice: StateCreator<IUserProfileSlice, [], [], IUserProfileSlice> = (
  set,
  get
) => ({
  userProfile: undefined,
  profileStatus: 'idle',
  profileError: undefined,
  updateEmailHandler: async (email, currentPassword) => {
    set({ profileStatus: 'pending', profileError: undefined });
    try {
      const reAuth = await reAuthenticated(currentPassword);
      await reAuth?.user.updateEmail(email);
      await usersColRef.doc(get().userProfile?.id).update({ email: email });
      set({ profileStatus: 'successful' });
    } catch (error) {
      set({ profileStatus: 'rejected', profileError: error as AuthError });
    } finally {
      setTimeout(() => {
        set({ profileStatus: 'idle' });
      }, 1500);
    }
  },
  updatePasswordHandler: async (currentPassword, newPassword) => {
    set({ profileStatus: 'pending', profileError: undefined });
    try {
      const reAuth = await reAuthenticated(currentPassword);
      await reAuth?.user.updatePassword(newPassword);
      set({ profileStatus: 'successful' });
    } catch (error) {
      set({ profileStatus: 'rejected', profileError: error as AuthError });
    } finally {
      setTimeout(() => {
        set({ profileStatus: 'idle' });
      }, 1500);
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
      set({ profileStatus: 'rejected', profileError: error as AuthError });
    } finally {
      setTimeout(() => {
        set({ profileStatus: 'idle' });
      }, 1500);
    }
  },
  retrieveUserProfileHandler: (user) => {
    set({ userProfile: user });
  },
});
