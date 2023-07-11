import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import type { StateCreator } from 'zustand';

import { usersColRef } from '../api/api';
import type { IAuth } from '../types/types';

export interface IAuthSlice {
  authInfo: FirebaseAuthTypes.User | null;
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
        setTimeout(() => {
          set({ authStatus: 'idle' });
        }, 1500);
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
        setTimeout(() => {
          set({ authStatus: 'idle' });
        }, 1500);
      });
  },
  authHandler: (user) => {
    set((state) => ({ ...state, authInfo: user }), true);
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
      setTimeout(() => {
        set({ authStatus: 'idle' });
      }, 1500);
    }
  },
  setStatusHandler: () => {
    set({ authStatus: 'idle', authError: { error: undefined, errorMessage: '' } });
  },
});
