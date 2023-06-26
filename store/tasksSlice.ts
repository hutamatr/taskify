import type { StateCreator } from 'zustand';

import {
  addTask,
  deleteTask,
  getAllCompleted,
  getAllInProgress,
  getAllTasks,
  getAllTasksByCategory,
  getTask,
  updateTask,
} from '../api/api';
import type { ITask } from '../types/types';

interface ITaskError {
  isError: boolean;
  errorMessage: string;
}
export interface ITaskSlice {
  tasks: ITask[];
  inProgressTasks: ITask[];
  completedTasks: ITask[];
  tasksByCategory: ITask[];
  task: ITask | object;
  isLoading: boolean;
  error: ITaskError;
  fetchAllTasksHandler: () => void;
  fetchAllInProgressHandler: () => void;
  fetchAllCompletedHandler: () => void;
  fetchAllTasksByCategoryHandler: (categoryId: string) => void;
  fetchTaskHandler: (taskId: string) => void;
  addTaskHandler: (task: ITask) => void;
  updateTaskHandler: (task: ITask) => void;
  deleteTaskHandler: (taskId: string) => void;
}

export const tasksSlice: StateCreator<ITaskSlice, [], [], ITaskSlice> = (set) => ({
  tasks: [],
  inProgressTasks: [],
  completedTasks: [],
  tasksByCategory: [],
  task: {},
  isLoading: false,
  error: { isError: false, errorMessage: '' },
  fetchAllTasksHandler: () => {
    try {
      set({
        isLoading: true,
        error: { isError: false, errorMessage: '' },
      });
      getAllTasks(set);
    } catch (error) {
      set({ isLoading: false, error: { isError: true, errorMessage: 'Failed get all task data' } });
    }
  },
  fetchAllInProgressHandler: () => {
    try {
      set({
        isLoading: true,
        error: { isError: false, errorMessage: '' },
      });
      getAllInProgress(set);
    } catch (error) {
      set({ isLoading: false, error: { isError: true, errorMessage: 'Failed get all task data' } });
    }
  },
  fetchAllCompletedHandler: () => {
    try {
      set({
        isLoading: true,
        error: { isError: false, errorMessage: '' },
      });
      getAllCompleted(set);
    } catch (error) {
      set({
        isLoading: false,
        error: { isError: true, errorMessage: 'Failed get all task data' },
      });
    }
  },
  fetchAllTasksByCategoryHandler: (categoryId) => {
    try {
      set({
        isLoading: true,
        error: { isError: false, errorMessage: '' },
      });
      getAllTasksByCategory(categoryId, set);
    } catch (error) {
      set({ isLoading: false, error: { isError: true, errorMessage: 'Failed get task data' } });
    }
  },
  fetchTaskHandler: (taskId) => {
    try {
      set({
        isLoading: true,
        error: { isError: false, errorMessage: '' },
      });
      const taskData = getTask(taskId);
      set(() => ({
        isLoading: false,
        task: taskData,
      }));
    } catch (error) {
      set({ isLoading: false, error: { isError: true, errorMessage: 'Failed get task data' } });
    }
  },
  addTaskHandler: async (task) => {
    try {
      set({
        isLoading: true,
        error: { isError: false, errorMessage: '' },
      });
      await addTask(task);
      set({ isLoading: false });
    } catch (error) {
      set({ isLoading: false, error: { isError: true, errorMessage: 'Failed send task' } });
    }
  },
  updateTaskHandler: async (task) => {
    try {
      set({
        isLoading: true,
        error: { isError: false, errorMessage: '' },
      });
      await updateTask(task);
      set({ isLoading: false });
    } catch (error) {
      set({ isLoading: false, error: { isError: true, errorMessage: 'Failed update task' } });
    }
  },
  deleteTaskHandler: async (taskId) => {
    try {
      set({
        isLoading: true,
        error: { isError: false, errorMessage: '' },
      });
      await deleteTask(taskId);
      set({ isLoading: false });
    } catch (error) {
      set({ isLoading: false, error: { isError: true, errorMessage: 'Failed delete task' } });
    }
  },
});