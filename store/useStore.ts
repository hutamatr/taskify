import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { type ITaskSlice, tasksSlice } from './tasksSlice';

export const useStore = create<ITaskSlice>()(
  persist(
    (...a) => ({
      ...tasksSlice(...a),
    }),
    {
      name: 'tasks-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
