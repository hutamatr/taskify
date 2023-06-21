import { create } from 'zustand';

import { type ITaskSlice, tasksSlice } from './tasksSlice';

export const useStore = create<ITaskSlice>((...a) => ({
  ...tasksSlice(...a),
}));
