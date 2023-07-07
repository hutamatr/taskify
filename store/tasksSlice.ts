import type { StateCreator } from 'zustand';

import { addTask, deleteTask, updateTask } from '../api/api';
import type { ITask } from '../types/types';

export interface ITaskSlice {
  tasks: ITask[] | [];
  tasksStatus: 'idle' | 'pending' | 'successful' | 'rejected';
  tasksError: { error: Error | undefined; errorMessage: string };
  getAllTasksHandler: (tasks: ITask[], loading: boolean, error: Error | undefined) => void;
  addTaskHandler: (task: ITask) => void;
  updateTaskHandler: (task: ITask) => void;
  deleteTaskHandler: (taskId: string) => void;
}

export const tasksSlice: StateCreator<ITaskSlice, [], [], ITaskSlice> = (set) => ({
  tasks: [],
  tasksStatus: 'idle',
  tasksError: { error: undefined, errorMessage: '' },
  getAllTasksHandler: (tasks, loading, error) => {
    set((state) => ({ ...state, tasks: tasks, allTasksLoading: loading, error: error }), true);
  },
  addTaskHandler: async (task) => {
    try {
      set({
        tasksStatus: 'pending',
        tasksError: undefined,
      });
      await addTask(task);
      set({ tasksStatus: 'successful' });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.code) {
        switch (error.code) {
          case 'permission-denied':
            set({
              tasksStatus: 'rejected',
              tasksError: { error: error, errorMessage: 'Permission denied!' },
            });
            break;
          case 'unauthenticated':
            set({
              tasksStatus: 'rejected',
              tasksError: { error: error, errorMessage: 'Your not authenticated!' },
            });
            break;
        }
      } else {
        set({
          tasksStatus: 'rejected',
          tasksError: error,
        });
      }
    }
  },
  updateTaskHandler: async (task) => {
    try {
      set({
        tasksStatus: 'pending',
        tasksError: undefined,
      });
      await updateTask(task);
      set({ tasksStatus: 'successful' });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.code) {
        switch (error.code) {
          case 'permission-denied':
            set({
              tasksStatus: 'rejected',
              tasksError: { error: error, errorMessage: 'Permission denied!' },
            });
            break;
          case 'unauthenticated':
            set({
              tasksStatus: 'rejected',
              tasksError: { error: error, errorMessage: 'Your not authenticated!' },
            });
            break;
        }
      } else {
        set({
          tasksStatus: 'rejected',
          tasksError: error,
        });
      }
    }
  },
  deleteTaskHandler: async (taskId) => {
    try {
      set({
        tasksStatus: 'pending',
        tasksError: undefined,
      });
      await deleteTask(taskId);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.code) {
        switch (error.code) {
          case 'permission-denied':
            set({
              tasksStatus: 'rejected',
              tasksError: { error: error, errorMessage: 'Permission denied!' },
            });
            break;
          case 'unauthenticated':
            set({
              tasksStatus: 'rejected',
              tasksError: { error: error, errorMessage: 'Your not authenticated!' },
            });
            break;
        }
      } else {
        set({
          tasksStatus: 'rejected',
          tasksError: error,
        });
      }
    }
  },
});
