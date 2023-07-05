import type { StateCreator } from 'zustand';

import { addCategories, deleteCategory, deleteCategoryWithTasks } from '../api/api';
import type { ICategories } from '../types/types';

export interface ICategoriesSlice {
  categoriesLoading: boolean;
  categoriesError: Error | undefined;
  addCategoryHandler: (category: ICategories) => void;
  deleteCategoryHandler: (categoryId: string, isDeleteWithTasks: boolean, userId: string) => void;
}

export const categoriesSlice: StateCreator<ICategoriesSlice, [], [], ICategoriesSlice> = (set) => ({
  categoriesLoading: false,
  categoriesError: undefined,
  addCategoryHandler: async (category) => {
    try {
      set({
        categoriesLoading: true,
        categoriesError: undefined,
      });
      await addCategories(category);
    } catch (error) {
      if (error instanceof Error) {
        set({
          categoriesLoading: false,
          categoriesError: error,
        });
      }
    } finally {
      set({ categoriesLoading: false });
    }
  },
  deleteCategoryHandler: async (categoryId, isDeleteWithTasks, userId) => {
    try {
      set({
        categoriesLoading: true,
        categoriesError: undefined,
      });
      if (isDeleteWithTasks) {
        await deleteCategoryWithTasks(userId, categoryId);
      } else {
        await deleteCategory(categoryId);
      }
    } catch (error) {
      if (error instanceof Error) {
        set({
          categoriesLoading: false,
          categoriesError: error,
        });
      }
    } finally {
      set({ categoriesLoading: false });
    }
  },
});
