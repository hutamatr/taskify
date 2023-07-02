import { FirebaseError } from 'firebase/app';
import { User } from 'firebase/auth';
import type { StateCreator } from 'zustand';

import { logOut, signIn, signUp } from '../api/api';
import type { IAuth, IUserInfo } from '../types/types';

export interface IAuthSlice {
  isAuth: boolean;
  userInfo: IUserInfo | null;
  isLoading: boolean;
  error: { isError: boolean; errorMessage: string };
  signUpHandler: (newUser: IAuth) => void;
  signInHandler: (user: IAuth) => void;
  SignOutHandler: () => void;
  retrieveAuthStateHandler: (user: User | null) => void;
}

export const authSlice: StateCreator<IAuthSlice, [], [], IAuthSlice> = (set) => ({
  isAuth: false,
  isLoading: false,
  userInfo: null,
  error: { isError: false, errorMessage: '' },
  signUpHandler: async (newUser) => {
    try {
      set({
        isLoading: false,
        error: { isError: false, errorMessage: '' },
      });
      await signUp(newUser, set);
    } catch (error) {
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case 'auth/email-already-in-use':
            set({
              isLoading: false,
              error: { isError: true, errorMessage: 'Email address already in use' },
            });
            break;
        }
      } else {
        set({
          isLoading: false,
          error: { isError: true, errorMessage: 'Failed sign up new user' },
        });
      }
    }
  },
  signInHandler: (user) => {
    try {
      set({
        isLoading: false,
        error: { isError: false, errorMessage: '' },
      });
      signIn(user, set);
    } catch (error) {
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case 'auth/user-not-found':
            set({
              isLoading: false,
              error: { isError: true, errorMessage: 'User not found' },
            });
            break;
        }
      } else {
        set({
          isLoading: false,
          error: { isError: true, errorMessage: 'Failed sign in' },
        });
      }
    }
  },
  SignOutHandler: async () => {
    try {
      set({
        isLoading: false,
        error: { isError: false, errorMessage: '' },
      });
      await logOut(set);
    } catch (error) {
      if (error instanceof FirebaseError) {
        set({
          isLoading: false,
          error: { isError: true, errorMessage: 'Failed sign out' },
        });
      }
    }
  },
  retrieveAuthStateHandler: (user) => {
    if (user) {
      set({ isAuth: Boolean(user.uid), userInfo: { email: user.email as string, uid: user.uid } });
    } else {
      set({ isAuth: false, userInfo: null });
    }
  },
});
