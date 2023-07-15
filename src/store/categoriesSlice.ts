import type { StateCreator } from 'zustand';

import { addCategories, deleteCategory, deleteCategoryWithTasks } from '@api/api';

import type { ICategories } from 'types/types';

export interface ICategoriesSlice {
  categories: ICategories[] | [];
  categoriesStatus: 'idle' | 'pending' | 'successful' | 'rejected';
  categoriesError: { error: Error | undefined; errorMessage: string };
  getAllCategoriesHandler: (
    categories: ICategories[],
    loading: boolean,
    error: Error | undefined
  ) => void;
  addCategoryHandler: (category: ICategories) => void;
  deleteCategoryHandler: (categoryId: string, isDeleteWithTasks: boolean, userId: string) => void;
  setCategoriesStatusHandler: (status: 'idle' | 'pending' | 'successful' | 'rejected') => void;
}

export const categoriesSlice: StateCreator<ICategoriesSlice, [], [], ICategoriesSlice> = (set) => ({
  categories: [],
  categoriesStatus: 'idle',
  categoriesError: { error: undefined, errorMessage: '' },
  getAllCategoriesHandler: (categories, loading, error) => {
    set(
      (state) => ({
        ...state,
        categories: categories,
        categoriesStatus: loading
          ? 'pending'
          : categories
          ? 'successful'
          : error
          ? 'rejected'
          : 'idle',
        categoriesError: error
          ? { error: error, errorMessage: 'Failed get all categories!' }
          : { error: undefined, errorMessage: '' },
      }),
      true
    );
  },
  addCategoryHandler: async (category) => {
    try {
      set({
        categoriesStatus: 'pending',
        categoriesError: undefined,
      });
      await addCategories(category);
      set({ categoriesStatus: 'successful' });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      switch (error.code) {
        case 'permission-denied':
          set({
            categoriesStatus: 'rejected',
            categoriesError: { error: error, errorMessage: 'Permission denied!' },
          });
          break;
        case 'unauthenticated':
          set({
            categoriesStatus: 'rejected',
            categoriesError: { error: error, errorMessage: 'Your not authenticated!' },
          });
          break;
        default:
          set({
            categoriesStatus: 'rejected',
            categoriesError: { error: error, errorMessage: 'Failed add new category!' },
          });
          break;
      }
    }
  },
  deleteCategoryHandler: async (categoryId, isDeleteWithTasks, userId) => {
    try {
      set({
        categoriesStatus: 'pending',
        categoriesError: undefined,
      });
      if (isDeleteWithTasks) {
        await deleteCategoryWithTasks(userId, categoryId);
      } else {
        await deleteCategory(categoryId);
      }
      set({ categoriesStatus: 'successful' });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      switch (error.code) {
        case 'permission-denied':
          set({
            categoriesStatus: 'rejected',
            categoriesError: { error: error, errorMessage: 'Permission denied!' },
          });
          break;
        case 'unauthenticated':
          set({
            categoriesStatus: 'rejected',
            categoriesError: { error: error, errorMessage: 'Your not authenticated!' },
          });
          break;
        default:
          set({
            categoriesStatus: 'rejected',
            categoriesError: { error: error, errorMessage: 'Failed delete category!' },
          });
          break;
      }
    }
  },
  setCategoriesStatusHandler: (status) => {
    set({ categoriesStatus: status });
  },
});
