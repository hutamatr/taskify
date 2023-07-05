import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import type { StateCreator } from 'zustand';

export interface IAuthSlice {
  userInfo: FirebaseAuthTypes.User | null;
  authLoading: boolean;
  authError: Error | undefined;
  authHandler: (user: FirebaseAuthTypes.User | null) => void;
  SignOutHandler: () => void;
}

export const authSlice: StateCreator<IAuthSlice, [], [], IAuthSlice> = (set) => ({
  authLoading: false,
  userInfo: null,
  authError: undefined,
  authHandler: (user) => {
    set((state) => ({ ...state, userInfo: user }), true);
  },
  SignOutHandler: async () => {
    try {
      set({
        authLoading: true,
        authError: undefined,
      });
      await auth().signOut();
    } catch (error) {
      if (error instanceof Error) {
        set({
          authLoading: false,
          authError: error,
        });
      }
    } finally {
      set({ authLoading: false });
    }
  },
});
