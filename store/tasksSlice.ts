import type { StateCreator } from 'zustand';

import { addTask, deleteTask, updateTask } from '../api/api';
import type { ITask } from '../types/types';

export interface ITaskSlice {
  allTasksLoading: boolean;
  allTasksError: Error | undefined;
  addTaskHandler: (task: ITask) => void;
  updateTaskHandler: (task: ITask) => void;
  deleteTaskHandler: (taskId: string) => void;
}

export const tasksSlice: StateCreator<ITaskSlice, [], [], ITaskSlice> = (set) => ({
  allTasksLoading: false,
  allTasksError: undefined,
  addTaskHandler: async (task) => {
    try {
      set({
        allTasksLoading: true,
        allTasksError: undefined,
      });
      await addTask(task);
    } catch (error) {
      if (error instanceof Error) {
        set({ allTasksLoading: false, allTasksError: error });
      }
    } finally {
      set({ allTasksLoading: false });
    }
  },
  updateTaskHandler: async (task) => {
    try {
      set({
        allTasksLoading: true,
        allTasksError: undefined,
      });
      await updateTask(task);
    } catch (error) {
      if (error instanceof Error) {
        set({ allTasksLoading: false, allTasksError: error });
      }
    } finally {
      set({ allTasksLoading: false });
    }
  },
  deleteTaskHandler: async (taskId) => {
    try {
      set({
        allTasksLoading: true,
        allTasksError: undefined,
      });
      await deleteTask(taskId);
    } catch (error) {
      if (error instanceof Error) {
        set({ allTasksLoading: false, allTasksError: error });
      }
    } finally {
      set({ allTasksLoading: false });
    }
  },
});
