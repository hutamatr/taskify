import { type StateCreator } from 'zustand';

import {
  addTask,
  deleteTask,
  getAllCompleted,
  getAllInProgress,
  getAllTasks,
  getTask,
  updateTask,
} from '../api/api';
import { type ITask } from '../types/types';

interface ITaskError {
  isError: boolean;
  errorMessage: string;
}
export interface ITaskSlice {
  tasks: ITask[];
  // recentTasks: ITask[];
  inProgressTasks: ITask[];
  completedTasks: ITask[];
  task: ITask | object;
  isLoading: boolean;
  error: ITaskError;
  fetchAllTasksHandler: () => void;
  fetchAllInProgress: () => void;
  fetchAllCompleted: () => void;
  fetchTaskHandler: (taskId: string) => void;
  addTaskHandler: (task: ITask) => void;
  updateTaskHandler: (task: ITask) => void;
  deleteTaskHandler: (taskId: string) => void;
}

export const tasksSlice: StateCreator<ITaskSlice, [], [], ITaskSlice> = (set) => ({
  tasks: [],
  // recentTasks: [],
  inProgressTasks: [],
  completedTasks: [],
  task: {},
  isLoading: false,
  error: { isError: false, errorMessage: '' },
  fetchAllTasksHandler: () => {
    try {
      set({ isLoading: true });
      getAllTasks(set);
    } catch (error) {
      set({ isLoading: false, error: { isError: true, errorMessage: 'Failed get all task data' } });
    }
  },
  fetchAllInProgress: () => {
    try {
      set({ isLoading: true });
      getAllInProgress(set);
    } catch (error) {
      set({ isLoading: false, error: { isError: true, errorMessage: 'Failed get all task data' } });
    }
  },
  fetchAllCompleted: () => {
    try {
      set({ isLoading: true });
      getAllCompleted(set);
    } catch (error) {
      set({
        isLoading: false,
        error: { isError: true, errorMessage: 'Failed get all task data' },
      });
    }
  },
  fetchTaskHandler: (taskId) => {
    try {
      set({ isLoading: true });
      const taskData = getTask(taskId);
      set(() => ({
        isLoading: false,
        task: taskData,
      }));
    } catch (error) {
      set({ isLoading: false, error: { isError: true, errorMessage: 'Failed get task data' } });
    }
  },
  addTaskHandler: async ({ title, description, date }: ITask) => {
    try {
      set({ isLoading: true });
      await addTask({ title, description, date });
      set({ isLoading: false });
    } catch (error) {
      set({ isLoading: false, error: { isError: true, errorMessage: 'Failed send task' } });
    }
  },
  updateTaskHandler: async (task) => {
    try {
      set({ isLoading: true });
      await updateTask(task);
      set({ isLoading: false });
    } catch (error) {
      set({ isLoading: false, error: { isError: true, errorMessage: 'Failed update task' } });
    }
  },
  deleteTaskHandler: async (taskId) => {
    try {
      set({ isLoading: true });
      await deleteTask(taskId);
      set({ isLoading: false });
    } catch (error) {
      set({ isLoading: false, error: { isError: true, errorMessage: 'Failed delete task' } });
    }
  },
});
