import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { authSlice, type IAuthSlice } from './authSlice';
import { categoriesSlice, type ICategoriesSlice } from './categoriesSlice';
import { type ITaskSlice, tasksSlice } from './tasksSlice';

export const useStore = create<IAuthSlice & ITaskSlice & ICategoriesSlice>()(
  persist(
    (...a) => ({
      ...authSlice(...a),
      ...tasksSlice(...a),
      ...categoriesSlice(...a),
    }),
    {
      name: 'tasks-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
