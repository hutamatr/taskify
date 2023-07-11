import { create } from 'zustand';

import { authSlice, type IAuthSlice } from './authSlice';
import { categoriesSlice, type ICategoriesSlice } from './categoriesSlice';
import { type ITaskSlice, tasksSlice } from './tasksSlice';
import { type IUserProfileSlice, userProfileSlice } from './userProfileSlice';

export const useStore = create<IAuthSlice & ITaskSlice & ICategoriesSlice & IUserProfileSlice>()(
  (...a) => ({
    ...authSlice(...a),
    ...tasksSlice(...a),
    ...categoriesSlice(...a),
    ...userProfileSlice(...a),
  })
);
