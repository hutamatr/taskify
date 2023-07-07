import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import type { StateCreator } from 'zustand';

import { usersColRef } from '../api/api';
import type { IAuth } from '../types/types';

export interface IAuthSlice {
  userInfo: FirebaseAuthTypes.User | null;
  authStatus: 'idle' | 'pending' | 'successful' | 'rejected';
  authError: { error: Error | undefined; errorMessage: string };
  signUpHandler: (newUser: IAuth) => void;
  signInHandler: (user: IAuth) => void;
  SignOutHandler: () => void;
  authHandler: (user: FirebaseAuthTypes.User | null) => void;
  setStatusHandler: () => void;
}

export const authSlice: StateCreator<IAuthSlice, [], [], IAuthSlice> = (set) => ({
  authStatus: 'idle',
  userInfo: null,
  authError: { error: undefined, errorMessage: '' },
  signUpHandler: ({ email, password, userName }) => {
    set({ authStatus: 'pending', authError: { error: undefined, errorMessage: '' } });
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        user.user
          .updateProfile({
            displayName: userName,
          })
          .then(() => {
            set({ userInfo: user.user });
          });

        usersColRef.add({
          userId: user.user.uid,
          name: userName,
          email: email,
        });

        set({ authStatus: 'successful' });
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          set({
            authStatus: 'rejected',
            authError: { error: error, errorMessage: 'Email address is already in use!' },
          });
        }
        if (error.code === 'auth/invalid-email') {
          set({
            authStatus: 'rejected',
            authError: { error: error, errorMessage: 'Email address is invalid!' },
          });
        }
        if (error.code === 'auth/weak-password') {
          set({
            authStatus: 'rejected',
            authError: {
              error: error,
              errorMessage: 'Password must be 8 characters long or more',
            },
          });
        }
      })
      .finally(() => {
        set({ authStatus: 'idle' });
      });
  },
  signInHandler: ({ email, password }) => {
    set({ authStatus: 'pending', authError: { error: undefined, errorMessage: '' } });
    auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        set({ authStatus: 'successful', userInfo: user.user });
      })
      .catch((error) => {
        if (error.code === 'auth/wrong-password') {
          set({
            authStatus: 'rejected',
            authError: { error: error, errorMessage: 'Password is invalid!' },
          });
        }
        if (error.code === 'auth/invalid-email') {
          set({
            authStatus: 'rejected',
            authError: { error: error, errorMessage: 'Email address is invalid!' },
          });
        }
        if (error.code === 'auth/user-not-found') {
          set({
            authStatus: 'rejected',
            authError: { error: error, errorMessage: 'User Not Found!' },
          });
        }
      })
      .finally(() => {
        set({ authStatus: 'idle' });
      });
  },
  authHandler: (user) => {
    set((state) => ({ ...state, userInfo: user }), true);
  },
  SignOutHandler: async () => {
    try {
      set({
        authStatus: 'pending',
        authError: { error: undefined, errorMessage: '' },
      });
      await auth().signOut();
      set({ authStatus: 'successful' });
    } catch (error) {
      if (error instanceof Error) {
        set({
          authStatus: 'rejected',
          authError: { error: error, errorMessage: 'Failed sign out!' },
        });
      }
    } finally {
      set({ authStatus: 'idle' });
    }
  },
  setStatusHandler: () => {
    set({ authStatus: 'idle', authError: { error: undefined, errorMessage: '' } });
  },
});
