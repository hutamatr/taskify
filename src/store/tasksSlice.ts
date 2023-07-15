import type { StateCreator } from 'zustand';

import { addTask, deleteTask, updateTask } from '@api/api';

import type { ITask } from 'types/types';

export interface ITaskSlice {
  tasks: ITask[] | [];
  tasksStatus: 'idle' | 'pending' | 'successful' | 'rejected';
  tasksError: { error: Error | undefined; errorMessage: string };
  getAllTasksHandler: (tasks: ITask[], loading: boolean, error: Error | undefined) => void;
  addTaskHandler: (task: ITask) => void;
  updateTaskHandler: (task: ITask) => void;
  deleteTaskHandler: (taskId: string) => void;
  setTasksStatusHandler: (status: 'idle' | 'pending' | 'successful' | 'rejected') => void;
}

export const tasksSlice: StateCreator<ITaskSlice, [], [], ITaskSlice> = (set) => ({
  tasks: [],
  tasksStatus: 'idle',
  tasksError: { error: undefined, errorMessage: '' },
  getAllTasksHandler: (tasks, loading, error) => {
    set(
      (state) => ({
        ...state,
        tasks: tasks,
        categoriesStatus: loading ? 'pending' : tasks ? 'successful' : error ? 'rejected' : 'idle',
        tasksError: error
          ? { error: error, errorMessage: 'Failed get all tasks!' }
          : { error: undefined, errorMessage: '' },
      }),
      true
    );
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
        default:
          set({
            tasksStatus: 'rejected',
            tasksError: { error: error, errorMessage: 'Failed add new task!' },
          });
          break;
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
        default:
          set({
            tasksStatus: 'rejected',
            tasksError: { error: error, errorMessage: 'Failed update task!' },
          });
          break;
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
      set({ tasksStatus: 'successful' });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
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
        default:
          set({
            tasksStatus: 'rejected',
            tasksError: { error: error, errorMessage: 'Failed delete task!' },
          });
          break;
      }
    }
  },
  setTasksStatusHandler: (status) => {
    set({ tasksStatus: status });
  },
});
