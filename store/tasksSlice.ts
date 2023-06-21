import { type StateCreator } from 'zustand';

import { getAllTasks, getTask } from '../api/api';
import { type ITask } from '../types/types';

interface ITaskError {
  isError: boolean;
  errorMessage: string;
}
export interface ITaskSlice {
  tasks: ITask[];
  task: ITask | object;
  isLoading: boolean;
  error: ITaskError;
  fetchAllTasksHandler: () => void;
  fetchTaskHandler?: (taskId: string) => void;
  addTaskHandler?: () => void;
  updateTaskHandler?: () => void;
  deleteTaskHandler?: () => void;
}

export const tasksSlice: StateCreator<ITaskSlice, [], [], ITaskSlice> = (set) => ({
  tasks: [],
  task: {},
  isLoading: false,
  error: { isError: false, errorMessage: '' },
  fetchAllTasksHandler: () => {
    try {
      set({ isLoading: true });
      const tasksData = getAllTasks();
      set(
        () => ({
          isLoading: false,
          tasks: tasksData,
        }),
        true
      );
    } catch (error) {
      set({ isLoading: false, error: { isError: true, errorMessage: 'Failed get all task data' } });
    }
  },
  fetchTaskHandler: (taskId) => {
    try {
      set({ isLoading: true });
      const taskData = getTask(taskId);

      set({
        isLoading: false,
        task: taskData,
      });
    } catch (error) {
      set({ isLoading: false, error: { isError: true, errorMessage: 'Failed get task data' } });
    }
  },
});
