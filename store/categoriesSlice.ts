import type { StateCreator } from 'zustand';

import {
  addCategories,
  deleteCategory,
  deleteCategoryWithTasks,
  getAllCategories,
} from '../api/api';
import type { ICategories } from '../types/types';

export interface ICategoriesSlice {
  categories: ICategories[];
  isLoading: boolean;
  error: { isError: boolean; errorMessage: string };
  fetchAllCategoriesHandler: (userId: string) => void;
  addCategoryHandler: (category: ICategories) => void;
  deleteCategoryHandler: (categoryId: string, isDeleteWithTasks: boolean) => void;
}

export const categoriesSlice: StateCreator<ICategoriesSlice, [], [], ICategoriesSlice> = (set) => ({
  categories: [],
  isLoading: false,
  error: { isError: false, errorMessage: '' },
  fetchAllCategoriesHandler: (userId) => {
    try {
      set({
        isLoading: true,
        error: { isError: false, errorMessage: '' },
      });
      getAllCategories(userId, set);
    } catch (error) {
      set({
        isLoading: false,
        error: { isError: true, errorMessage: 'Failed get all categories data' },
      });
    }
  },
  addCategoryHandler: async (category) => {
    try {
      set({
        isLoading: true,
        error: { isError: false, errorMessage: '' },
      });
      await addCategories(category);
    } catch (error) {
      set({
        isLoading: false,
        error: { isError: true, errorMessage: 'Failed get all categories data' },
      });
    }
  },
  deleteCategoryHandler: async (categoryId, isDeleteWithTasks) => {
    try {
      set({
        isLoading: true,
        error: { isError: false, errorMessage: '' },
      });
      if (isDeleteWithTasks) {
        await deleteCategoryWithTasks(categoryId);
      } else {
        await deleteCategory(categoryId);
      }
    } catch (error) {
      set({
        isLoading: false,
        error: { isError: true, errorMessage: 'Failed get all categories data' },
      });
    }
  },
});
