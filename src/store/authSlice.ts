import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import type { StateCreator } from 'zustand';

import { usersColRef } from '@api/api';

import type { IAuth } from 'types/types';

export interface IAuthSlice {
  authInfo: FirebaseAuthTypes.User | null;
  authStatus: 'idle' | 'pending' | 'successful' | 'rejected';
  authError: { error: Error | undefined; errorMessage: string };
  signUpHandler: (newUser: IAuth) => void;
  signInHandler: (user: IAuth) => void;
  SignOutHandler: () => void;
  authHandler: (user: FirebaseAuthTypes.User | null) => void;
  setAuthStatusHandler: (status: 'idle' | 'pending' | 'successful' | 'rejected') => void;
}

export const authSlice: StateCreator<IAuthSlice, [], [], IAuthSlice> = (set) => ({
  authStatus: 'idle',
  authInfo: null,
  authError: { error: undefined, errorMessage: '' },
  signUpHandler: ({ email, password, username }) => {
    set({ authStatus: 'pending', authError: { error: undefined, errorMessage: '' } });
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        user.user.updateProfile({
          displayName: username,
        });

        usersColRef.add({
          userId: user.user.uid,
          username: username,
          email: email,
        });

        set({ authStatus: 'successful' });
      })
      .catch((error) => {
        switch (error.code) {
          case 'auth/email-already-in-use':
            set({
              authStatus: 'rejected',
              authError: { error: error, errorMessage: 'Email address is already in use!' },
            });
            break;
          case 'auth/invalid-email':
            set({
              authStatus: 'rejected',
              authError: { error: error, errorMessage: 'Email address is invalid!' },
            });
            break;
          case 'auth/weak-password':
            set({
              authStatus: 'rejected',
              authError: {
                error: error,
                errorMessage: 'Password must be 8 characters long or more',
              },
            });
            break;
          default:
            set({
              authStatus: 'rejected',
              authError: {
                error: error,
                errorMessage: 'Failed sign up account!',
              },
            });
            break;
        }
      });
  },
  signInHandler: ({ email, password }) => {
    set({ authStatus: 'pending', authError: { error: undefined, errorMessage: '' } });
    auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        set({ authStatus: 'successful', authInfo: user.user });
      })
      .catch((error) => {
        switch (error.code) {
          case 'auth/wrong-password':
            set({
              authStatus: 'rejected',
              authError: { error: error, errorMessage: 'Password is invalid!' },
            });
            break;
          case 'auth/invalid-email':
            set({
              authStatus: 'rejected',
              authError: { error: error, errorMessage: 'Email address is invalid!' },
            });
            break;
          case 'auth/user-not-found':
            set({
              authStatus: 'rejected',
              authError: { error: error, errorMessage: 'User Not Found!' },
            });
            break;
          default:
            set({
              authStatus: 'rejected',
              authError: { error: error, errorMessage: 'Failed sign in account!' },
            });
            break;
        }
      });
  },
  SignOutHandler: () => {
    set({ authStatus: 'pending', authError: { error: undefined, errorMessage: '' } });
    auth()
      .signOut()
      .then(() => {
        set({ authStatus: 'successful' });
      })
      .catch((error) => {
        set({
          authStatus: 'rejected',
          authError: { error: error, errorMessage: 'Failed sign out!' },
        });
      });
  },
  authHandler: (user) => {
    set((state) => ({ ...state, authInfo: user }), true);
  },
  setAuthStatusHandler: (status) => {
    set({ authStatus: status });
  },
});
